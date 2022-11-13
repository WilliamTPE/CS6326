import React, { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
export default function Editor(props) {
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"]
        ]
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "color",
        "image",
        "background",
        "align",
        "size",
        "font"
    ];

    const [code, setCode] = useState("");

    const handleProcedureContentChange = (content, delta, source, editor) => {
        setCode(content);
        // console.log("EditorContent: " + content);
        //let has_attribues = delta.ops[1].attributes || "";
        //console.log(has_attribues);
        //const cursorPosition = e.quill.getSelection().index;
        // this.quill.insertText(cursorPosition, "★");
        //this.quill.setSelection(cursorPosition + 1);
    };

    return (
        <>
            {console.log(code)}
            <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={code}
                onChange={handleProcedureContentChange}
            />
        </>
    );
}