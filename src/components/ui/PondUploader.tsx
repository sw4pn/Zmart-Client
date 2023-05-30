import { FilePond, registerPlugin } from "react-filepond";
import { FC, useState } from "react";
import { apiUrl } from "../../config/config";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

interface Props {
  className?: string;
  multiple?: boolean;
  reorder?: boolean;
  folder?: string;
}

const PondUploader: FC<Props> = (props) => {
  const { className, folder = "", multiple = false, reorder = true } = props;

  const [files, setFiles] = useState([]);

  const url = `${apiUrl}uploads/`;

  const process = (
    fieldName,
    file,
    metadata,
    load,
    error,
    progress,
    abort,
    transfer,
    options
  ) => {
    const formData = new FormData();
    formData.append("images", file);

    // const url = `${baseUrl}uploads/avatar`;
    const config = {
      withCredentials: true,
      headers: {
        Accept: "application/json",
      },
      onUploadProgress: (ProgressEvent) => {
        const loaded = ProgressEvent.loaded;
        const total = ProgressEvent.total;
        const goingProgress = Math.round((loaded / total) * 100);
        progress(true, goingProgress, total);
        // progress(e.lengthComputable, e.loaded, e.total);
      },
      // cancelToken: new axios.CancelToken((cancel) => {
      //   //create cancel token
      //   const cancelFunction = () => {
      //     cancel();
      //     error("Request Cancelled");
      //   };
      //   // Return cancel function
      //   return cancelFunction;
      // }),
    };

    axios
      .post(url, formData, config)
      .then((response) => {
        const publicId = response.data[0].public_id;
        const restData = { publicId, ...response.data };

        // add uploaded file information to localFiles state
        props.saveFiles(response.data[0]);
        load(publicId, response.data);
        return restData;
      })
      //   .then((data) => load(data))
      .catch((err) => {
        error("error uploading files");
      });

    return {
      abort: () => {
        // abortRequest();
        // if (request && typeof request.cancel === "function") {
        //   request.cancel();
        // }
        abort();
      },
    };
  };

  //   const revert = (token, successCallback, errorCallback) => {
  const revert = (uniqueFileId, successCallback, errorCallback) => {
    const publicId = uniqueFileId.split(".")[0]; // assuming the public id is the part before the extension in the unique file id

    axios
      .delete(`${baseUrl}uploads/${publicId}`, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
        },
      })
      .then(() => {
        // props.saveFiles([{ url: "/images/user-profile.png" }]);
        // props.saveFiles([{ url: "/images/user-profile.png" }]);
        props.saveFiles([]);
        setFiles([]);
        successCallback();
      })
      .catch((err) => {
        errorCallback("error deleting file.");
      });
  };

  return (
    <div className={`${className}`}>
      <FilePond
        acceptedFileTypes={["image/"]}
        allowMultiple={multiple}
        allowReorder={reorder}
        // server={serverData}
        // maxFiles={maxFiles}
        files={files}
        onupdatefiles={setFiles}
        // server={{ process, revert }}
        labelIdle="Drag & Drop your files or <span class='filepond--label-action'>Browse</span>"
      />
    </div>
  );
};

export default PondUploader;
