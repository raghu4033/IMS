import { useRef, useState } from "react";

export const ImageUpload = ({ error, onUpload, onDelete, onError }) => {
  const fileInputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const onFileChange = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (file) {
        setLoading(true);
        const data = new FormData();
        data.append("file", file);
        data.append(
          "upload_preset",
          import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET
        );
        data.append(
          "cloud_name",
          import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME
        );
        data.append("folder", "profiles");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME
          }/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );
        const res = await response.json();
        console.log("res", res);
        if (res?.url) {
          onUpload(res.url);
          setImageUrl(res.url);
        } else {
          onError("Something went wrong, please try again later.");
        }
        setLoading(false);
      }
    } catch (err) {
      onError(err?.message || "Something went wrong, please try again later.");
      setLoading(false);
    }
  };

  const onUploadClick = (e) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current?.click();
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          maxWidth: "100%",
        }}
      >
        <div>
          <button onClick={onUploadClick} disabled={loading || imageUrl}>
            {loading ? "Uploading..." : imageUrl ? "Uploaded" : "Upload"}
          </button>
          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={onFileChange}
            accept="image/*"
          />
        </div>
        {imageUrl ? (
          <>
            <p
              style={{
                display: "flex",
                width: "500px", // width can be depend on you
                whiteSpace: "normal",
                wordBreak: "break-word",
                fontSize: "12px",
              }}
            >
              {imageUrl}
            </p>
            <div
              style={{ color: "#7e7e7e", cursor: "pointer" }}
              onClick={() => {
                setImageUrl(null);
                onDelete();
              }}
            >
              Remove
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      {error ? <div className="error-text">{error}</div> : <></>}
    </>
  );
};
