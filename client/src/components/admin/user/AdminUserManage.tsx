import { SearchOutlined } from "@ant-design/icons";
import React, { useRef } from "react";
import Highlighter from "react-highlight-words";
import type { InputRef } from "antd";
import { Button, Input, Space, Table, Modal } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { UserDetail } from "../../../modules/user/type";
import { changeDate } from "../../community/Community";
import styled from "styled-components";
import MyPageForm from "../../../container/auth/MyPageForm";

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
  handleDelete: (userNum: number) => void;
  handleGradeUpdate: (userNum: number, grade: number, id: string) => void;
  setIsDelete: (isDelete: boolean) => void;
  isDelete?: boolean;
}

const AdminUserManage: React.FC<AdminUserProps> = (props) => {
  const [searchText, setSearchText] = React.useState("");
  const [searchedColumn, setSearchedColumn] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const searchInput = useRef<InputRef>(null);
  const [uNum, setUNum] = React.useState<number>(0);
  console.log("isModalOpen", isModalOpen);
  const showModal = (num: number) => {
    setUNum(num);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    props.setIsDelete(!props.isDelete);
  };
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
      dataIndex: "id",
      key: "id",
      width: "10%",
      ...getColumnSearchProps("id"),
    },
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      width: "10%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "닉네임",
      dataIndex: "nick",
      key: "nick",
      width: "10%",
      ...getColumnSearchProps("nick"),
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
    {
      title: "정보수정 / 회원탈퇴 / 등급UP&Down(최고관리자만 가능)",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Space size="middle">
            {((props.user.grade > 2 && record.grade === 3) ||
              record.grade < 3) && (
              <ActionButton onClick={() => showModal(record.userNum)}>
                정보 수정
              </ActionButton>
            )}
            <Modal
              title={null}
              open={isModalOpen}
              onCancel={handleCancel}
              width="70%"
              style={{ maxHeight: "800vh", minWidth: "70%" }}
              footer={null}
            >
              <MyPageForm
                isAdmin={true}
                uNum={uNum}
                setIsModalOpen={setIsModalOpen}
                handleCancel={handleCancel}
              />
            </Modal>
            {record.grade < 3 && props.user.userNum !== record.userNum ? (
              <ActionButton onClick={() => props.handleDelete(record.userNum)}>
                회원 탈퇴
              </ActionButton>
            ) : (
              <></>
            )}
            {props.user.grade === 3 ? (
              record.grade === 2 ? (
                <ActionButton
                  onClick={() =>
                    props.handleGradeUpdate(
                      record.userNum,
                      record.grade,
                      record.id
                    )
                  }
                >
                  등급 Down
                </ActionButton>
              ) : (
                record.grade === 1 && (
                  <ActionButton
                    onClick={() =>
                      props.handleGradeUpdate(
                        record.userNum,
                        record.grade,
                        record.id
                      )
                    }
                  >
                    등급 Up
                  </ActionButton>
                )
              )
            ) : null}
          </Space>
        </div>
      ),
      width: "20%",
    },
  ];
  console.log("props.user.grade", props.user.grade);
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
