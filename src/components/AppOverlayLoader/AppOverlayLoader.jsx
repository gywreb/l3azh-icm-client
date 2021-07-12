import React from "react";
import LoadingOverlay from "react-loading-overlay";
import { appColor } from "../../constants/styles";

const AppOverlayLoader = ({ isLoading = false, loadText }) => {
  return (
    <LoadingOverlay
      active={isLoading}
      spinner
      text={loadText || "Loading your content..."}
      styles={{
        wrapper: {
          width: "100%",
          height: "100%",
          overflow: isLoading ? "hidden" : "scroll",
        },
        overlay: (base) => ({
          ...base,
          background: "rgba(0, 0, 0, 0.5)",
        }),
        spinner: (base) => ({
          ...base,
          "& svg circle": {
            stroke: appColor.mainColor,
          },
        }),
      }}
    />
  );
};

export default AppOverlayLoader;
