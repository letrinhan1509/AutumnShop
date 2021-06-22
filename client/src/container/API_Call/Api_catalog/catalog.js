import AxiosCatalog from "./AxiosCatalog"

const catalog = {
    getAll: () => {
        const url = "/danh-sach-dm";
        return AxiosCatalog.get(url);
    },
    //(Danh mục theo id)
    getid: (id) => {
        const url = `/danh-muc-id/:${id}`;
        return AxiosCatalog.get(url);
    },
    //(Danh sách tất cả loại)
    getAllProtype: () => {
        const url = "/danh-sach-loai";
        return AxiosCatalog.get(url);
    },
    //(Loại theo id)
    getTypeID: (id) => {
        const url = `/loai-id/:${id}`;
        return AxiosCatalog.get(url);
    },
    //(Thêm mới 1 loại sp)
    addProtype: (values) => {
        const url = "/them-loai";
        return AxiosCatalog.post(url, values);
    },
    //(Thêm mới 1 danh mục sp)
    addCatalog: (values) => {
        const url = "/them-danh-muc";
        return AxiosCatalog.post(url, values);
    },
    //(Cập nhật thông tin loại theo id)
    updateProtype: (values) => {
        const url = "/cap-nhat-loai";
        return AxiosCatalog.put(url, values);
    },
    //(Cập nhật thông tin danh mục theo id)
    updateCatalog: (values) => {
        const url = "/cap-nhat-danh-muc";
        return AxiosCatalog.put(url, values);
    },
    //(Xoá loại sản phẩm theo id)
    deleteProtype: (id) => {
        const url = "/xoa-loai";
        return AxiosCatalog.delete(url, id);
    }
};

export default catalog;