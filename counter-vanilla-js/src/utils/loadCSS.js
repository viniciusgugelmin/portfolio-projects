function loadCSS() {
    const file = location.pathname.split("/").pop();

    const createLink = (file) => {
        const link = document.createElement("link");
        link.href = file.slice(0, file.lastIndexOf(".")) + ".css";
        link.type = "text/css";
        link.rel = "stylesheet";
        link.media = "screen,print";

        return link;
    }

    const link = createLink(file);

    const [head] = document.getElementsByTagName("head");
    head.appendChild(link)
}

export {loadCSS}