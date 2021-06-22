import AxiosProduct from "./AxiosProduct"

const product = {
    getAll: () => {
        const url = "/";
        return AxiosProduct.get(url);
    },
    //(Sản phẩm theo id)
    getid: (id) => {
        const url = `/${id}`;
        return AxiosProduct.get(url);
    },
    //(DSách sản phẩm theo loại)
    getLoai: (idLoai) => {
        const url = `/spham-loai/:${idLoai}`;
        return AxiosProduct.get(url);
    },
    //(DSách sản phẩm theo danh mục)
    getDM: (idDM) => {
        const url = `/spham-danh-muc/:${idDM}`;
        return AxiosProduct.get(url);
    },
    //(DSách sản phẩm theo nhà sản xuất)
    getNSX: (idNSX) => {
        const url = `/spham-nha-sx/:${idNSX}`;
        return AxiosProduct.get(url);
    },
    addproduct: (values) => {
        const url = "/them-san-pham";
        return AxiosProduct.post(url, values);
    },
    updatePro: (values) => {
        const url = "/cap-nhat-san-pham";
        return AxiosProduct.put(url, values);
    },
    updateStatus: (values) => {
        const url = "/cap-nhat-trang-thai";
        return AxiosProduct.put(url, values);
    },
    deletePro: (id) => {
        const url = `/xoa-san-pham/${id}`;
        return AxiosProduct.delete(url);
    },
};

export default product;