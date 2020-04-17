/**
 *
 * TableBase
 *
 */

import React from "react";
import "./style.scss";
import "../InputForm/style.scss";
import _ from "lodash";
import { Form } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Formik } from "formik";
// Component
import Selection from "../Selection";
import Checkbox from "components/Checkbox";
// Lib
import ClassNames from "classnames";
import { CustomMultiSelect, SearchBar } from "../TableFormatter";
import { capitalizeTheFirstLetter } from "../../helper/exportFunction";

class TableBase extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      params: {},
      selected: [], //array hold rows selected in table
      actioned: [], // array hold rows is working in popup confirm
      showChangeStatusConfirm: false,
      showRemoveConfirm: false
    };
    this._handleTitleStatus = this._handleTitleStatus.bind(this);
  }

  componentDidMount() {
    //console.log('TableBase props', this.props);
    const { baseParams = {} } = this.props;

    this.setState({
      params: { ...this.state.params, ...baseParams }
    });
  }

  actionFormat = (cell, row) => {
    const {
      model = "",
      actions = {
        view: {
          label: "",
          className: "",
          act: () => {
          }
        }
      }
    } = this.props;

    let temp = Object.keys(actions).map((key, index) => {
      const { label = "", className = "" } = actions[key];
      return (
        <button key={index}
                className={ClassNames("cursor-pointer", `btn`, `btn-${key}`, `btn-${className}`)}
                onClick={(e) => {
                  e.preventDefault();
                  const {
                    act = () => {
                      console.log("act");
                    }
                  } = actions[key];
                  act(row);
                }}>{capitalizeTheFirstLetter(label)}</button>);
    });

    return <div className={"actions-inner"}>{temp}</div>;
  };
  _handleSubmitSelect = (field, value, form, submit) => {
    form[field] = value;
    submit();
  };
  _handleTitleStatus = (arr) => {

    let title = "", hidden = true, active = true;

    if (arr.length >= 1) {
      let first = arr[0];
      active = first.active;
      title = active ? "Deactive" : "Active";
      hidden = arr.filter(item => item.active !== active).length >= 1;

      return { title, hidden, active };
    }
    return { title, hidden, active };
  };
  onRowSelect = (row, isSelected, e) => {
    //console.log('onRowSelect', isSelected);
    if (!isSelected) {
      this.setState(
        {
          selected: this.state.selected.filter(item => item._id !== row._id)
        },
        () => {
          // console.log('unselect', this.state.selected);
          this.setState({
            actioned: this.state.selected
          });
          this.props.onChangeSelect(this.state.selected);
        }
      );
    } else {
      this.setState(
        {
          selected: [...this.state.selected, row]
        },
        () => {
          // console.log('select', this.state.selected);
          this.setState({
            actioned: this.state.selected
          });
          this.props.onChangeSelect(this.state.selected);
        }
      );
    }
  };
  onSelectAll = (isSelected, rows) => {
    if (!isSelected) {

      this.setState(
        {
          selected: []
        },
        () => {
          this.props.onChangeSelect(this.state.selected);
        }
      );
    } else {

      this.setState(
        {
          selected: rows
        },
        () => {
          this.props.onChangeSelect(this.state.selected);
        }
      );
    }
  };
  sortData = (field, order) => {
    const {
      onChangeParams = () => {

      },
      baseParams = {
        size: 10,
        page: 0
      }
    } = this.props;

    let newParams = {
      ...this.state.params,
      ...baseParams,
      sortBy: field,
      sortType: order === "asc" ? "ascending" : "descending"
    };
    console.log(newParams);
    this.setState(
      {
        params: newParams
      },
      () => {
        onChangeParams(this.state.params);
      }
    );
  };

  changePagination = (pagination) => {
    const {
      onChangeParams = () => {

      }
    } = this.props;
    const { page = 0, limit = 0 } = pagination;
    let size = limit;

    this.setState(
      {
        params: {
          ...this.state.params,
          size: size,
          page: page
        }
      },
      () => {
        onChangeParams(this.state.params);
      }
    );
  };

  render() {
    const {
      model = "user",
      name: tableName = "thai_table",
      isSearch = false,
      isSelectRow = false,
      title = "",
      placeholderSearch = "",
      actions = {},
      filters = [
        // {
        //   title: "Status",
        //   field: "status",
        //   type: "selection", //isMulti, isSingle
        //   options: [
        //     {
        //       label: "Active",
        //       value: true
        //     },
        //     {
        //       label: "Deactive",
        //       value: false
        //     }
        //   ]
        // }
      ],
      pagination = {
        currentPage: 0,
        totalPage: 10,
        totalRow: 10,
        size: 10
      },
      tableData = [],
      tableOptions = {},
      tableColumn = [
        {
          label: "",
          dataField: "",
          dataSort: true,
          dataAlign: "",
          dataFormat: (cell, row) => {
          },
          className: "",
          width: 50
        }
      ],
      baseParams = {
        size: 10,
        page: 0
      },
      bordered = false,
      onChangeParams = params => {
      }
    } = this.props;

    const baseTableOptions = _.merge(
      {
        sortIndicator: false, // disable sort indicator
        noDataText: "No data",
        onSortChange: this.sortData
      }, tableOptions);

    const selectRow = {
      mode: "checkbox",
      bgColor: "#f5f5f5",
      columnWidth: 64 / 14 + "rem",
      customComponent: CustomMultiSelect,
      onSelect: this.onRowSelect,
      onSelectAll: this.onSelectAll,
      clickToSelect: true
    };


    return (
      <div className={ClassNames("base-table-container", { "selecting": this.state.selected.length >= 2 })}>
        <div className="base-table-form">
          <Formik
            ref={ref => (this.formik = ref)}
            initialValues={
              {

                keyword: ""

              }}
            enableReinitialize={true}
            validationSchema={{}}
            onSubmit={values => {
              // console.log(values);
              this.setState(
                {
                  params: {
                    ...this.state.params,
                    ...baseParams,
                    ...values
                  }
                },
                () => {
                  console.log(this.state.params);
                  onChangeParams(this.state.params);
                }
              );
            }}
          >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue
                /* and other goodies */
              }) => (
              <Form
                inline
                id="form"
                ref={ref => (this.form = ref)}
                onSubmit={handleSubmit}
                className="d-flex align-items-center"
              >
                {isSearch &&
                <SearchBar
                  placeholderSearch={`Search for ${model}...`}
                  value={values.keyword}
                  name={"keyword"}
                  onChange={handleChange}
                />}
                <div className={"ml-auto"}>
                  {filters &&
                  filters.map((item, index) => {
                    switch (item.type) {
                      case "selection": {
                        const { options = [], field = "", title = "" } = item;
                        return (
                          <Selection
                            key={index}
                            name={field}
                            className={"mb-0"}
                            options={options}
                            defaultValue={item.defaultValue}
                            placeholder={`${title}`}
                            onChange={option => {
                              setFieldValue(field, option);
                              this._handleSubmitSelect(
                                item.field,
                                option.value,
                                values,
                                handleSubmit
                              );
                            }}
                          />
                        );
                      }
                      case "checkbox": {
                        const { field = "", title = "" } = item;
                        setFieldValue(field, e.target.checked);
                        return (
                          <Checkbox
                            key={index}
                            name={field}
                            label={`${title}`}
                            onChange={e => {
                              this._handleSubmitSelect(
                                item.field,
                                e.target.checked,
                                values,
                                handleSubmit
                              );
                            }}
                          />
                        );
                      }
                      default:
                        break;
                    }
                  })}
                </div>

                {/* Submit */}
                <button type={"submit"} hidden>
                  sub
                </button>
                {/*{tableData &&*/}
                {/*tableData.length > 0 && (*/}
                {/*<PaginationFormatter*/}
                {/*offset={pagination.currentPage * pagination.size}*/}
                {/*limit={pagination.size}*/}
                {/*total={pagination.totalRow}*/}
                {/*page={pagination.currentPage}*/}
                {/*changePagination={this.changePagination}*/}
                {/*/>*/}
                {/*)}*/}
              </Form>
            )}
          </Formik>
        </div>

        {title && <div className={"title-table"}>{title}</div>}

        <BootstrapTable
          ref={tableName}
          data={tableData}
          hover
          striped
          options={baseTableOptions}
          bordered={bordered}
          selectRow={isSelectRow ? selectRow : {}}
          containerClass="base-table responsive-table-wrapper"
          tableHeaderClass="base-table-header"
          tableBodyClass="base-table-content"
          keyField={tableColumn && tableColumn[0].dataField && tableColumn[0].isKey ? tableColumn[0].dataField : "_id"}
        >
          {/* <TableHeaderColumn dataField="_id" isKey >
            ID
          </TableHeaderColumn> */}

          {tableColumn.map(column => {
            return (
              <TableHeaderColumn
                {...column}
                key={column.label}
                dataField={column.dataField}
                dataSort={column.dataSort}
                dataAlign={column.dataAlign}
                headerAlign={column.headerAlign}
                tdAttr={{ "data-attr": column.label }}
                columnClassName={ClassNames("td-data", column.className)}
                width={column.width ? column.width : "auto"}
                dataFormat={column.dataFormat
                  ? column.dataFormat
                  : (cell, row) => {
                    return <div>{cell}</div>;
                  }
                }
              >
                {column.label}
              </TableHeaderColumn>
            );
          })}

          {!_.isEmpty(actions) && <TableHeaderColumn
            dataField="actions"
            width={"20%"}
            tdAttr={{ "data-attr": "actions" }}
            columnClassName={ClassNames("actions")}
            dataFormat={(cell, row) => this.actionFormat(cell, row)}
          >
            Actions
          </TableHeaderColumn>
          }
        </BootstrapTable>

      </div>
    );
  }
}

TableBase.propTypes = {};

export default TableBase;
