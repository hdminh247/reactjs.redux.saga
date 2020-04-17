/**
 *
 * ImageList
 *
 */

import React from "react";
import "./style.scss";
import ClassNames from "classnames";

/* eslint-disable react/prefer-stateless-function */
class ImageList extends React.Component {

  handleImageChange = (e, listImages) => {
    e.preventDefault();

    Array.from(e.target.files).map(item => {
      let image = { file: "", fileName: "", action: "add" };
      let reader = new FileReader();
      let file = item;
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        //file size need lower than 2MB
        if (file.size <= 2 * 1024 * 1024) {
          image.file = file;
          image.fileName = reader.result;
          //image.type = reader.result;
          listImages.push(image);
          this.props.onChange(listImages);
        }
      };

    });
  };

  render() {
    const {
      imageList = [],
      labelText = "Attach a file",
      classNameIcon = "icon-attached",
      classNameLabel = "color-blue",
      maxImage = "",
      name = "",
      onChange = () => {
      }
    } = this.props;
    return (
      <div className="image-list-wrapper">
        <div className="addition-action">
          <label className={classNameLabel}>
            <input
              name={name}
              hidden={imageList.filter(image => image.action !== "delete").length >= maxImage
              }
              className="multi-image"
              multiple="true"
              type="file"
              accept="image/x-png,image/jpeg"
              onChange={e => {
                e.persist(); // Make this event can be reused
                this.handleImageChange(e, imageList);
              }}
            />
            <span className={ClassNames("icon", classNameIcon)}/>
            <span className={"label-text"}>{labelText}</span>
          </label>
          <div className="image-section form-input">
            <div className="image-wrapper">
              {imageList.length > 0 && imageList.map((item, index) => {
                const { fileName = "" } = item;
                return (
                  <div className={"image-item"}>
                    <img src={fileName}
                         onError={e => {
                           e.target.onerror = null;
                           e.target.src = "./image-not-found.png";
                         }}
                    />
                    <span className={"icon icon-delete"} onClick={() => {
                      imageList.splice(index, 1);
                      onChange(imageList);
                    }}/>
                  </div>
                );
              })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ImageList.propTypes = {};

export default ImageList;
