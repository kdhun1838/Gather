import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import type { InputRef } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { UserDetail } from "../../../modules/user/type";
import { changeDate } from "../../community/Community";
import { styled } from "styled-components";

interface DataType {
  key: number;
  id: string;
  name: string;
  nick: string;
  age: number;
  grade: number;
  gender: string;
  createdAt: Date;
}

type DataIndex = keyof DataType;

interface AdminUserProps {
  data: UserDetail[];
  user: UserDetail;
}

const AdminUserManage: React.FC<AdminUserProps> = (props) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex | DataIndex[]
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      // 여러 열에서 검색을 지원하기 위해 배열을 사용합니다.
      const dataIndexArray = Array.isArray(dataIndex) ? dataIndex : [dataIndex];
      return dataIndexArray.some((index) =>
        record[index].toString().toLowerCase().includes(value.toLowerCase())
      );
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text, record) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={searchText.split(" ")}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<UserDetail> = [
    {
      title: "아이디(닉네임)",
      dataIndex: ["id", "nick"],
      key: "id",
      width: "20%",
      ...getColumnSearchProps(["id", "nick"]),
      render: (text, record) => {
        return `${record.id} (${record.nick})`;
      },
    },
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      width: "15%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "나이",
      dataIndex: "age",
      key: "age",
      width: "8%",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
      width: "7%",
      sorter: (a, b) => {
        if (a.gender === b.gender) return 0;
        if (a.gender === "여") return -1;
        if (b.gender === "여") return 1;
        return 0;
      },
    },
    {
      title: "가입일",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "10%",
      sorter: (a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateA - dateB;
      },
      render: (text, record) => {
        return changeDate(record.createdAt);
      },
    },
    {
      title: "등급",
      dataIndex: "grade",
      key: "grade",
      width: "15%",
      sorter: (a, b) => a.grade - b.grade,
      defaultSortOrder: "descend",
      render: (text, record) => {
        switch (record.grade) {
          case 3:
            return (
              <div style={{ fontWeight: "Bold", color: "red" }}>최고관리자</div>
            );
          case 2:
            return (
              <div style={{ fontWeight: "Bold", color: "blue" }}>관리자</div>
            );
          case 1:
            return "일반 유저";
          default:
            return "알 수 없음";
        }
      },
    },
    {
      title: "정보수정 / 회원탈퇴 / 등급UP&Down(최고관리자만 가능)",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <ActionButton>정보 수정</ActionButton>
          {record.grade < 3 && props.user.userNum !== record.userNum ? (
            <ActionButton>회원 탈퇴</ActionButton>
          ) : (
            <></>
          )}
          {props.user.grade === 3 ? (
            record.grade === 2 ? (
              <ActionButton>등급 Down</ActionButton>
            ) : (
              record.grade === 1 && <ActionButton>등급 Up</ActionButton>
            )
          ) : null}
        </Space>
      ),
      width: "25%",
    },
  ];

  return <Table columns={columns} dataSource={props.data} />;
};

const ActionButton = styled.div`
  color: #1677ff;
  cursor: pointer;

  &:hover {
    color: darkblue;
    font-weight: bold;
  }
`;
export default AdminUserManage;
