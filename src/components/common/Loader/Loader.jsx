import Spiner from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import s from "./Loader.module.css";

const Loader = () => (
  <div className={s.container}>
    <Spiner type="ThreeDots" color=" #7efa2b" height={80} width={80} />
  </div>
);

export default Loader;
