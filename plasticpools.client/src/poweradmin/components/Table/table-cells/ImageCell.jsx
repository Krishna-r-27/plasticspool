const ImageCell = ({ src }) => (
    <img
        src={src}
        alt=""
        width={240}     // 👈 sweet spot
        height={150}
        className="object-cover rounded-md border"
    />
);

export default ImageCell;
