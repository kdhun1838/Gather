import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import type { InputRef } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { UserDetail } from "../../../modules/user/type";
import { changeDate } from "../../community/Community";

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
  user: any;
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
    dataIndex: DataIndex
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
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<any> = [
    {
      title: "아이디",
      dataIndex: "id", // props.data에서 가져오는 필드에 맞게 수정
      key: "id", // props.data에서 가져오는 필드에 맞게 수정
      width: "10%",
      ...getColumnSearchProps("id"),
    },
    {
      title: "이름",
      dataIndex: "name", // props.data에서 가져오는 필드에 맞게 수정
      key: "name", // props.data에서 가져오는 필드에 맞게 수정
      width: "10%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "나이",
      dataIndex: "age",
      key: "age",
      width: "5%",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "성별",
      dataIndex: "gender",
      key: "gender",
      width: "5%",
      sorter: (a, b) => {
        // "여"이면 -1, "남"이면 1, 같으면 0을 반환하여 정렬합니다.
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
        return changeDate(record.createdAt.toString());
      },
    },
    {
      title: "등급",
      dataIndex: "grade",
      key: "grade",
      width: "5%",
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
  ];

  return <Table columns={columns} dataSource={props.data} />;
};

export default AdminUserManage;
