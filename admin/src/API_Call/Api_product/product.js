import AxiosProduct from "./AxiosProduct"

const product = {
    getAll: () => {
        const url = "/";
        return AxiosProduct.get(url);
    },
    getSize: () => {
        const url = "/bang-size";
        return AxiosProduct.get(url);
    },
    //(Sản phẩm theo id)
    getid: (id) => {
        const url = `/${id}`;
        return AxiosProduct.get(url);
    },
    //(DSách sản phẩm theo mã loại)
    getLoai: (id) => {
        const url = `/loai/${id}`;
        return AxiosProduct.get(url);
    },
    //(DSách sản phẩm theo mã danh mục)
    getDM: (id) => {
        const url = `/danh-muc/${id}`;
        return AxiosProduct.get(url);
    },
    //(DSách sản phẩm theo mã nhà sản xuất)
    getNSX: (id) => {
        const url = `/nha-san-xuat/${id}`;
        return AxiosProduct.get(url);
    },
    //(Size theo id)
    getSizeId: (id) => {
        const url = `/bang-size/${id}`;
        return AxiosProduct.get(url);
    },
    addproduct: (values) => {
        const url = "/";
        return AxiosProduct.post(url, values);
    },
    addSize: (values) => {
        const url = "/bang-size";
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
    updateSize: (values) => {
        const url = "/bang-size";
        return AxiosProduct.put(url, values);
    },
    deletePro: (id) => {
        const url = `/${id}`;
        return AxiosProduct.delete(url);
    },
    deleteSize: (id) => {
        const url = `/bang-size/${id}`;
        return AxiosProduct.delete(url);
    }
};

export default product;