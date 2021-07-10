import AxiosCatalog from "./AxiosCatalog"

const catalog = {
    getAll: () => {
        const url = "/";
        return AxiosCatalog.get(url);
    },
    //(Chi tiết 1 danh mục theo mã danh mục)
    getDanhmucID: (id) => {
        const url = `/${id}`;
        return AxiosCatalog.get(url);
    },
    //(Danh sách tất cả loại)
    getAllType: () => {
        const url = "/loai";
        return AxiosCatalog.get(url);
    },
    //(Tất cả loại sphẩm theo mã danh mục)
    getTypeDanhmucID: (id) => {
        const url = `/${id}/loai`;
        return AxiosCatalog.get(url);
    },
    //(Chi tiết 1 loại theo mã loại)
    getTypeID: (id) => {
        const url = `/loai/${id}`;
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
    //(Cập nhật thông tin loại theo mã loại)
    updateProtype: (values) => {
        const url = "/cap-nhat-loai";
        return AxiosCatalog.put(url, values);
    },
    //(Cập nhật thông tin danh mục theo mã danh mục)
    updateCatalog: (values) => {
        const url = "/cap-nhat-danh-muc";
        return AxiosCatalog.put(url, values);
    },
    //(Cập nhật trạng thái danh mục theo mã danh mục)
    updateStatus: (values) => {
        const url = "/cap-nhat-trang-thai";
        return AxiosCatalog.put(url, values);
    },
    //(Xoá loại sản phẩm theo id)
    deleteProtype: (id) => {
        const url = `/xoa-loai/${id}`;
        return AxiosCatalog.delete(url);
    }
};

export default catalog;