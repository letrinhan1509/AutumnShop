import AxiosComment from "./AxiosComment"

const comment = {
    getAll: () => {
        const url = "/danh-sach";
        return AxiosComment.get(url);
    },
    //(Bình luận theo id)
    getid: (idCmt) => {
        const url = `/id=:${idCmt}`;
        return AxiosComment.get(url);
    },
    //(Bình luận theo mã sản phẩm)
    getProductID: (id) => {
        const url = `/san-pham/id=:${id}`;
        return AxiosComment.get(url);
    },
    //(Bình luận theo mã khách hàng)
    getUserID: (id) => {
        const url = `/khach-hang/id=:${id}`;
        return AxiosComment.get(url);
    },
    //(Chi tiết tất cả bình luận theo id)
    getDetailID: (id) => {
        const url = `/chi-tiet-bluan/id=:${id}`;
        return AxiosComment.get(url);
    },
    //(Thêm mới 1 bình luận)
    addComment: (values) => {
        const url = "/them-binh-luan";
        return AxiosComment.post(url, values);
    },
    //(Trả lời 1 bình luận đã có sẵn)
    replyComment: (values) => {
        const url = "/tra-loi-binh-luan";
        return AxiosComment.post(url, values);
    },
    //(Chỉnh sửa nội dung bình luận)
    updateComment: (values) => {
        const url = "/cap-nhat-binh-luan";
        return AxiosComment.put(url, values);
    },
    //(Chỉnh sửa nội dung chi tiết(trả lời) bình luận)
    updateDeComment: (values) => {
        const url = "/cap-nhat-tra-loi-bluan";
        return AxiosComment.put(url, values);
    },
    //(Ẩn 1 bình luận theo mabl)
    hideCommet: (values) => {
        const url = "/an-binh-luan";
        return AxiosComment.put(url, values);
    },
    //(Xoá 1 bình luận theo mabl)
    deleteCommentID: (id) => {
        const url = "/xoa-binh-luan";
        return AxiosComment.delete(url, id);
    },
    //(Xoá 1 chi tiết(trả lời) bình luận)
    deleteCommentDe: (id) => {
        const url = "/xoa-tra-loi-bluan";
        return AxiosComment.delete(url, id);
    }
};

export default comment;