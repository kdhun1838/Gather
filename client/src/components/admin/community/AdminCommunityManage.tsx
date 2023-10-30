import React from "react";
import { CommunityTypeWithUser } from "../../../modules/community/type";
import Highlighter from "react-highlight-words";
import type { ColumnsType, ColumnType } from "antd/es/table";
import { Button, Input, Space, Table, InputRef } from "antd";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import { changeDate } from "../../community/Community";

interface OwnProps {
  data: CommunityTypeWithUser[];
  getData: () => void;
  goDetail: (comNum: number) => void;
}

type DataIndex = keyof CommunityTypeWithUser;

const AdminCommunityManage: React.FC<OwnProps> = (props) => {
  const [searchText, setSearchText] = React.useState<string>("");
  const [searchedColumn, setSearchedColumn] = React.useState<string>("");
  const searchInput = React.useRef<InputRef>(null);
  const [regNum, setRegNum] = React.useState<number>(0);

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
  ): ColumnType<CommunityTypeWithUser> => ({
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

  const columns: ColumnsType<CommunityTypeWithUser> = [
    {
      title: "번호",
      dataIndex: "communityNum",
      sorter: (a, b) => a.communityNum - b.communityNum,
      width: "10%",
    },
    {
      title: "카테고리",
      dataIndex: "category",
      filters: [
        {
          text: "후기",
          value: "후기",
        },
        {
          text: "질문",
          value: "질문",
        },
        {
          text: "잡담",
          value: "잡담",
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
      title: "자세히보기(수정/삭제)",
      dataIndex: "communityNum",
      key: "communityNum",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => props.goDetail(record.communityNum)}
          >
            자세히보기
          </Button>
        </>
      ),
      width: "17%",
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={props.data} />
    </div>
  );
};

export default AdminCommunityManage;
