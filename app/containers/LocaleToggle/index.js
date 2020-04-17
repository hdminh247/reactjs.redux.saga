/*
 *
 * LanguageToggle
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { changeLocale } from "../LanguageProvider/actions";
import { makeSelectLocale } from "../LanguageProvider/selectors";
// Lib
import localStoreService from "local-storage";
import axios from "axios";
import { urlLink } from "../../helper/route";
import _ from "lodash";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";

export const localeArray = [
  {
    icon: "en.png",
    name: "English",
    countryCode: "en"
  },
  {
    icon: "de.png",
    name: "Germany",
    countryCode: "de"
  },
  {
    icon: "th.png",
    name: "Thailand",
    countryCode: "th"
  },
  {
    icon: "vi.png",
    name: "VietNam",
    countryCode: "vi"
  }
];

export class LocaleToggle extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      locale = "",
      onLocaleToggle = () => {
      },
      history = []
    } = this.props;
    const currentLocale = _.find(localeArray, { "countryCode": locale }) || {
      icon: "",
      name: "English",
      countryCode: "en"
    };
    return (
      <div className={"local-toggle-wrapper"}>
        <UncontrolledDropdown
          className={"locale-wrapper"}
        >
          <DropdownToggle caret>
            <div className={"dropdown-toggle-wrapper"}>
              <div className={"country"}>
                <img alt={"locale"} className={"country-icon"} src={currentLocale.icon}/>
                <span className={"country-code"}>{currentLocale.name}</span>
              </div>
            </div>
          </DropdownToggle>
          <DropdownMenu>
            {localeArray.map((item, index) => {
              return <DropdownItem key={index}
                                   onClick={(e) => {
                                     let { countryCode: value = "" } = item;
                                     const { location = {} } = history;
                                     const { pathname = "" } = location;
                                     history.replace(urlLink.changingLocale);
                                     setTimeout(() => {
                                       localStoreService.set("locale", value);
                                       onLocaleToggle(value);
                                       axios.defaults.headers.common["lang"] = value;
                                       history.replace(pathname);
                                     }, 1000);
                                   }}>
                <div className={"item-country-wrapper"}>
                  <img alt='locale' className={"country-icon"} src={item.icon}/>
                  <span className={"country-name"}>{item.name}</span>
                </div>
              </DropdownItem>;
            })}
          </DropdownMenu>
        </UncontrolledDropdown>
        {/*<Toggle*/}
        {/*{...this.props}*/}
        {/*value={locale}*/}
        {/*values={appLocales}*/}
        {/*messages={messages}*/}
        {/*onToggle={(e) => {*/}
        {/*let value = e.target.value;*/}
        {/*const { location = {} } = history;*/}
        {/*const { pathname = "" } = location;*/}

        {/*history.replace(urlLink.changingLocale);*/}
        {/*setTimeout(() => {*/}
        {/*localStoreService.set("locale", value.toString());*/}
        {/*onLocaleToggle(value.toString());*/}
        {/*axios.defaults.headers.common["lang"] = value.toString();*/}
        {/*history.replace(pathname);*/}
        {/*}, 1000);*/}
        {/*}}*/}
        {/*/>*/}
      </div>
    );
  }
}

LocaleToggle.propTypes = {
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string,
  history: PropTypes.any
};

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({
  locale
}));

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: evt => dispatch(changeLocale(evt.target.value)),
    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocaleToggle);
