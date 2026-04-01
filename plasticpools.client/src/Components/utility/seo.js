export function setSEO({
    title,
    description,
    keywords,
    image,
    url,
}) {
    if (title) document.title = title;

    updateMeta("name", "description", description);
    updateMeta("name", "keywords", keywords);

    updateLink("canonical", url);

    // Open Graph (Facebook, LinkedIn)
    updateMeta("property", "og:title", title);
    updateMeta("property", "og:description", description);
    updateMeta("property", "og:image", image);
    updateMeta("property", "og:url", url);
    updateMeta("property", "og:type", "website");

    // Twitter
    updateMeta("name", "twitter:card", "summary_large_image");
    updateMeta("name", "twitter:title", title);
    updateMeta("name", "twitter:description", description);
    updateMeta("name", "twitter:image", image);
}

/* ---------- Helpers ---------- */

function updateMeta(attrType, attrName, value) {
    if (!value) return;

    let tag = document.querySelector(`meta[${attrType}="${attrName}"]`);

    if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attrType, attrName);
        document.head.appendChild(tag);
    }

    tag.setAttribute("content", value);
}

function updateLink(rel, href) {
    if (!href) return;

    let link = document.querySelector(`link[rel="${rel}"]`);

    if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", rel);
        document.head.appendChild(link);
    }

    link.setAttribute("href", href);
}