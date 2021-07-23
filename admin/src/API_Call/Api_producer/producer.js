import AxiosProducer from "./AxiosProducer"

const producer = {
    getAll: () => {
        const url = "/";
        return AxiosProducer.get(url);
    },
    //(Nhà sản xuất theo id)
    getid: (id) => {
        const url = `/${id}`;
        return AxiosProducer.get(url);
    },
    //(Thêm mới 1 nhà sản xuất)
    addProducer: (values) => {
        const url = "/";
        return AxiosProducer.post(url, values);
    },
    //(Cập nhật thông tin nhà sản xuất theo id)
    updateProducer: (values) => {
        const url = "/";
        return AxiosProducer.put(url, values);
    },
    //(Cập nhật trạng thái nhà sản xuất theo id)
    updateStatus: (values) => {
        const url = `/cap-nhat-trang-thai`;
        return AxiosProducer.put(url, values);
    },
    //(Xoá 1 nhà sản xuất theo id)
    deleteProducer: (id) => {
        const url = `/${id}`;
        return AxiosProducer.delete(url);
    },
};

export default producer;