const catchAsync = require('../utils/catchAsync');
const modelComment = require('../models/model_comment');


                    // COMMENT CONTROLLER

        // GET:
// GET List Comment
exports.getListComments = catchAsync(async (req, res, next) => {
    try {
        let listComments = await modelComment.list_Comments();
        return res.status(200).json({ status: "Success", listComments: listComments });
      } catch (error) {
        return res.status(400).json({ status: "Fail", message: "Lỗi...!", error: error })
    };
});
// GET Comment
exports.getComment = catchAsync(async (req, res, next) => {
    try {
        let idCmt = req.params.id;
        const comment = await modelComment.get_by_Id(idCmt);
        if(comment == -1)
            return res.status(400).json({ status: "Fail", message: "Không có bình luận nào !" });
        else
            return res.status(200).json({ status: "Success", comment: comment });
    } catch (error) {
        return res.status(400).json({ status: "Fail", message: "Lỗi...!", error: error })
    };
});
// GET Comment Of Client
exports.getCommentClient = catchAsync(async (req, res, next) => {
    try {
        let idUser = req.params.id;
        let listCmt = await modelComment.get_by_userId(idUser);
        if(listCmt == -1)
            return res.status(400).json({ status: "Fail", message: "Không có bình luận nào !" });
        else
            return res.status(200).json({ status: "Success", listComment: listCmt });
    } catch (error) {
        return res.status(400).json({ status: "Fail", message: "Lỗi...Không thể lấy danh sách bình luận!", error: error })
    };
});
// GET comment by product code
exports.getCommentByProduct = catchAsync(async (req, res, next) => {
    try {
        let idSpham = await req.params.idPro;
        let listCmt = await modelComment.get_by_productId(idSpham);
        if(listCmt == -1)
            return res.status(400).json({ status: "Fail", message: "Sản phẩm này không có bình luận nào !" });
        else
            return res.status(200).json({ status: "Success", listComment: listCmt });
    } catch (error) {
        return res.status(400).json({ status: "Fail", message: "Lỗi...!", error: error })
    };
});
// GET Detail A Comment
exports.getDetailComment = catchAsync(async (req, res, next) => {
    try {
        let idCmt = req.params.id;
        let listCmt = await modelComment.get_detailComment(idCmt);
        if(listCmt == -1)
            return res.status(400).json({ status: "Fail", message: "Không có chi tiết bình luận nào! Hoặc bình luận đó đã bị khoá" });
        else
            return res.status(200).json({ status: "Success", listComment: listCmt });
    } catch (error) {
        return res.status(400).json({ status: "Fail", message: "Lỗi...!", error: error })
    };
});


        // POST:
// Create Comment
exports.postComment = catchAsync(async (req, res, next) => {
    try {
        let data = {
            masp: req.body.masp,
            makh: req.body.makh,
            noidung: req.body.content,
            ngaybl: req.body.date,
        };
        if(!data.masp || !data.makh || !data.noidung || !data.ngaybl) {
            return res.status(400).json({ 
                status: "Fail", 
                message: "Thiếu thông tin, vui lòng nhập đầy đủ thông tin !" 
            });
        } else {
            let query = await modelComment.create_Comment(data);
            return res.status(200).json({ 
                status: "Success", 
                message: query 
            });
        };
    } catch (error) {
        return res.status(400).json({ 
            status: "Fail", 
            message: "Something went wrong!", 
            error: error 
        });
    };
});
// Create Rep Comment
exports.postReplyComment = catchAsync(async (req, res, next) => {
    try {
        let makh = req.body.makh;
        let data = {
            makh: makh,
            ten: req.body.tenkh,
            noidung: req.body.content,
            ngaybl: req.body.date,
            manv: req.body.manv,
            mabl: req.body.mabl
        };
        if(!data.mabl || !data.ten || !data.noidung || !data.ngaybl) {
            return res.status(400).json({ status: "Fail", message: "Thiếu thông tin, vui lòng nhập đầy đủ thông tin !" });
        };
        let query = await modelComment.create_RepComment(data);
        return res.status(200).json({ status: "Success", message: query });
    } catch (error) {
        return res.status(400).json({ status: "Fail", message: "Lỗi...!", error: error });
    };
});


        // PUT:
// Edit Comment
exports.putEditCommnet = catchAsync(async (req, res, next) => {
    try {
        let mabl = req.body.mabl;
        let noidung = req.body.noidung;
        if(!mabl || !noidung) {
            return res.status(400).json({ status: "Fail", message: "Thiếu thông tin, vui lòng nhập đầy đủ thông tin !" });
        };
        const comment = await modelComment.get_by_Id(mabl);
        if(comment == -1) {
            return res.status(400).json({ status: "Fail", message: "Mã bình luận " + `${mabl}` + " này không tồn tại, vui lòng kiểm tra lại !" });
        };
        let query = await modelComment.update_Comment(mabl, noidung);
        return res.status(200).json({ status: "Success", message: query });
    } catch (error) {
        return res.status(400).json({
            status: "Fail", 
            message: "Something went wrong",
            error: error
        });
    };
});
// Edit Reply Comment
exports.putEditRepComment = catchAsync(async (req, res, next) => {
    try {
        let mact = req.body.mact;
        let noidung = req.body.noidung;
        if(!mact || !noidung) {
            return res.status(400).json({ status: "Fail", message: "Thiếu thông tin, vui lòng nhập đầy đủ thông tin !" });
        };
        const commentDetail = await modelComment.get_detailComment_Id(mact);
        if(commentDetail == -1) {
            return res.status(400).json({ status: "Fail", message: "Mã bình luận " + `${mact}` + " này không tồn tại, vui lòng kiểm tra lại !" });
        };
        let query = await modelComment.update_RepComment(mact, noidung);
        return res.status(200).json({"status": "Success", "message": "Chỉnh sửa bình luận thành công!", "result": query});
    } catch (error) {
        return res.status(400).json({
            status: "Fail", 
            message: "Something went wrong",
            error: error
        });
    };
});
// Edit Comment Status
exports.putEditCommentStatus = catchAsync(async (req, res, next) => {
    try {
        let mabl = req.body.mabl;
        let trangthai = req.body.trangthai;
        // 1) Check null
        if(!mabl || !trangthai) {
            return res.status(400).json({ status: "Fail", message: "Thiếu thông tin, vui lòng nhập đầy đủ thông tin !" });
        };
        // 2) Check comment exists
        const comment = await modelComment.get_by_Id(mabl);
        if(comment == -1) {
            return res.status(400).json({ status: "Fail", message: "Mã bình luận " + `${mabl}` + " này không tồn tại, vui lòng kiểm tra lại !" });
        };
        if(trangthai == 0) {
            let queryLock = await modelComment.lock_Comment(mabl);
            return res.status(200).json({ status: "Success", message: queryLock });
        } else if(trangthai == 1) {
            let queryUnlock = await modelComment.unlock_Comment(mabl);
            return res.status(200).json({ status: "Success", message: queryUnlock });
        } else
            return res.status(400).json({ status: "Fail", message: "Lỗi...! Cập nhật trạng thái bình luận không thành công !" }); 
    } catch (error) {
        return res.status(400).json({ status: "Fail", message: "Lỗi...!", error: error });
    };
});


        // DELETE:
// Xoá bình luận (cha)
exports.deleteComment = catchAsync(async (req, res, next) => {
    let mabl = req.params.id;
    if(!mabl) {
        return res.status(400).json({ status: "Fail", message: "Thiếu thông tin, xoá bình luận thất bại !" });
    };
    try {
        let query = await modelComment.delete_Comment(mabl);
        return res.status(200).json({ status: "Success", message: query });
    } catch (error) {
        return res.status(400).json({ status: "Fail", message: "Lỗi...! Xoá bình luận không thành công!", error: error });
    };
});
// Xoá 1 chi tiết bình luận (con)
exports.deleteRepComment = catchAsync(async (req, res, next) => {
    let mact = req.params.id;
    if(!mact) {
        return res.status(400).json({ status: "Fail", message: "Thiếu thông tin, xoá bình luận thất bại !" });
    };
    try {
        let query = await modelComment.delete_RepComment(mact);
        return res.status(200).json({ status: "Success", message: query });
    } catch (error) {
        return res.status(400).json({ status: "Fail", message: "Lỗi...! Xoá bình luận không thành công!", error: error });
    }
});