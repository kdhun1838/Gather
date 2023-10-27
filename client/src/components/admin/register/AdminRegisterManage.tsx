import React from "react";
import { ListDetailTypeWithUser } from "../../../modules/register/type";
import type { ColumnsType, TableProps, ColumnType } from "antd/es/table";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table, Modal, InputRef } from "antd";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import AdminRegisterModal from "./AdminRegisterModal";
import AdminRegisterModalContainer from "../../../container/admin/register/AdminRegisterModalContainer";
import { changeDate } from "../../community/Community";

interface OwnProps {
  data: ListDetailTypeWithUser[];
  getData: () => void;
}

interface DataType {
  id: string;
  nick: string;
  name: string;
  registerNum: number;
  title: string;
  category: string;
  personnel: number;
  meeting: string;
  position: string;
  contact: string;
  period: string;
  content: string;
  view: number;
  favorite: number;
  state: number;
  createdAt: Date;
  updatedAt: Date;
}
type DataIndex = keyof DataType;

const AdminRegisterManage: React.FC<OwnProps> = (props) => {
  const [searchText, setSearchText] = React.useState<string>("");
  const [searchedColumn, setSearchedColumn] = React.useState<string>("");
  const searchInput = React.useRef<InputRef>(null);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [regNum, setRegNum] = React.useState<number>(0);

  const showModal = (num: number) => {
    setRegNum(num);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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

  const columns: ColumnsType<DataType> = [
    {
      title: "번호",
      dataIndex: "registerNum",
      sorter: (a, b) => a.registerNum - b.registerNum,
      width: "10%",
    },
    {
      title: "카테고리",
      dataIndex: "category",
      filters: [
        {
          text: "운동",
          value: "운동",
        },
        {
          text: "게임",
          value: "게임",
        },
        {
          text: "스터디",
          value: "스터디",
        },
        {
          text: "기타",
          value: "기타",
        },
      ],
      filterSearch: true,
      onFilter: (value: any, record) =>
        record.category.toString().includes(value),
      width: "8%",
    },
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title"),
      width: "27%",
    },
    {
      title: "인원",
      dataIndex: "personnel",
      key: "personnel",
      width: "8%",
      render: (_, record) =>
        record.personnel > 10 ? "10명 이상" : `${record.personnel}명`,
    },
    {
      title: "작성자",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
      width: "10%",
    },
    {
      title: "작성일",
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
      title: "모집상태",
      dataIndex: "state",
      filters: [
        {
          text: "모집중",
          value: 1,
        },
        {
          text: "모집완료",
          value: 2,
        },
      ],
      filterSearch: true,
      onFilter: (value: any, record) => record.state === value,
      render: (_, record) =>
        record.state === 1 ? (
          <div style={{ fontWeight: "bold", color: "green" }}>모집중</div>
        ) : (
          <div style={{ fontWeight: "bold", color: "red" }}>모집완료</div>
        ),
      width: "10%",
    },
    {
      title: "더보기(수정/삭제/마감등록)",
      dataIndex: "registerNum",
      key: "registerNum",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => showModal(record.registerNum)}>
            자세히보기
          </Button>
          <Modal
            title={null}
            open={isModalOpen}
            // onOk={handleOk}
            onCancel={handleCancel}
            width="70%"
            style={{ maxHeight: "800vh", minWidth: "70%" }}
            footer={null}
          >
            <AdminRegisterModalContainer
              postId={regNum}
              handleCancel={handleCancel}
              getData={props.getData}
            />
          </Modal>
        </>
      ),
      width: "17%",
    },
  ];

  // const onChange: TableProps<DataType>["onChange"] = (
  //   pagination,
  //   filters,
  //   sorter,
  //   extra
  // ) => {
  //   console.log("params", pagination, filters, sorter, extra);
  // };

  return (
    <div>
      <Table columns={columns} dataSource={props.data} />
    </div>
  );
};

export default AdminRegisterManage;
