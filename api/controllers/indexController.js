const axios = require('axios');
const catchAsync = require('../utils/catchAsync');
const modelIndex = require('../models/model_index');


function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.split(' ').join('-');
    return str;
};
function replaceNameProduct(nameProduct) {
    var newNameProduct = xoa_dau(nameProduct);
    return newNameProduct;
};


                    // INDEX CONTROLLER

        // GET
// GET: List of all cities
exports.getListCities = catchAsync(async (req, res, next) => {
    try {
        var url = "https://thongtindoanhnghiep.co/api/city";
        const listcities = await axios.get(url);
        return res.status(200).json({ 
            status: "Success", 
            city: listcities.data.LtsItem 
        });
        /* axios.get(url)
            .then(function (response) {
                // handle success
                return res.status(200).json({ 
                    status: "Success", 
                    city: response.data.LtsItem 
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                return res.status(400).json({ 
                    status: "Fail", 
                    message: "Lỗi! Không thể lấy danh sách thành phố!", 
                    error: error 
                });
            }); */
    } catch (error) {
        return res.status(400).json({
            status: "Fail", 
            message: "Something went wrong",
            error: error
        });
    };
});
// GET: Details 1 province
exports.getDetailCity = catchAsync(async (req, res, next) => {
    try {
        let id = req.params.id;
        if(!id) {
            return res.status(400).json({
                status: "Fail", 
                message: "Thiếu thông tin, vui lòng kiểm tra lại !"
            });
        };
        var url = "https://thongtindoanhnghiep.co/api/city/" + id;
        axios.get(url)
            .then(function (response) {
                // handle success
                return res.status(200).json({ 
                    status: "Success", 
                    city: response.data 
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                return res.status(400).json({ 
                    status: "Fail", 
                    message: "Lỗi...!", 
                    error: error 
                });
            });
    } catch (error) {
        return res.status(400).json({
            status: "Fail", 
            message: "Something went wrong",
            error: error
        });
    }
});
// GET: List of all counties/districts by province/city
exports.getListCounties = catchAsync(async (req, res, next) => {
    try {
        let id = req.params.id;
        if(!id) {
            return res.status(400).json({
                status: "Fail", 
                message: "Thiếu thông tin, vui lòng kiểm tra lại !"
            });
        };
        var url = "https://thongtindoanhnghiep.co/api/city/" + id + "/district";
        axios.get(url)
            .then(function (response) {
                // handle success
                return res.status(200).json({ 
                    status: "Success", 
                    district: response.data 
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                return res.status(400).json({ 
                    status: "Fail", 
                    message: "Something went wrong",
                    error: error 
                });
            });
    } catch (error) {
        return res.status(400).json({
            status: "Fail", 
            message: "Something went wrong",
            error: error
        });
    }
});
// GET: Details of 1 district/district
exports.getDetailDistrict = catchAsync(async (req, res, next) => {
    try {
        let id = req.params.id;
        if(!id) {
            return res.status(400).json({
                status: "Fail", 
                message: "Thiếu thông tin, vui lòng kiểm tra lại !"
            });
        };
        var url = "https://thongtindoanhnghiep.co/api/district/" + id;
        axios.get(url)
            .then(function (response) {
                // handle success
                return res.status(200).json({ 
                    status: "Success", 
                    district: response.data 
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                return res.status(404).json({ 
                    status: "Fail", 
                    error: error 
                });
            });
    } catch (error) {
        return res.status(400).json({
            status: "Fail", 
            message: "Something went wrong",
            error: error
        });
    }
});
// GET: List of all Wards/Communes in the District/District
exports.getListWards = catchAsync(async (req, res, next) => {
    try {
        let id = req.params.id;
        if(!id) {
            return res.status(400).json({
                status: "Fail", 
                message: "Thiếu thông tin, vui lòng kiểm tra lại !"
            });
        };
        var url = "https://thongtindoanhnghiep.co/api/district/" + id + "/ward";
        axios.get(url)
            .then(function (response) {
                // handle success
                return res.status(200).json({ 
                    status: "Success", 
                    ward: response.data 
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                return res.status(400).json({ 
                    status: "Fail", 
                    error: error 
                });
            });
    } catch (error) {
        return res.status(400).json({
            status: "Fail", 
            message: "Something went wrong",
            error: error
        });
    }
});
// GET: Details of a ward, commune, town
exports.getDetailWard = catchAsync(async (req, res, next) => {
    try {
        let id = req.params.id;
        if(!id) {
            return res.status(400).json({
                status: "Fail", 
                message: "Thiếu thông tin, vui lòng kiểm tra lại !"
            });
        };
        var url = "https://thongtindoanhnghiep.co/api/ward/" + id;
        const ward = await axios.get(url);
        return res.status(200).json({ 
            status: "Success", 
            ward: ward.data 
        });
    } catch (error) {
        return res.status(400).json({
            status: "Fail", 
            message: "Something went wrong",
            error: error
        });
    }
});
// GET: List currency
exports.getListCurrency = catchAsync(async (req, res, next) => {
    try {
        var url = "https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx?b=1";
        //var url = "https://apithanhtoan.com/iframe/ty-gia-ngan-hang/BFTV";
        const listCurrency = await axios.get(url);
        //console.log(listCurrency.data);
        
        return res.status(200).json({ 
            status: "Success", 
            listCurrency: listCurrency.data
        });
    } catch (error) {
        return res.status(400).json({
            status: "Fail", 
            message: "Something went wrong",
            error: error
        });
    }
});
// Tiền vận chuyển:
exports.postTransportFee = catchAsync(async (req, res, next) => {
    try {
        let pick_province = "TP.Ho Chi Minh";     // Tên tỉnh/thành phố nơi lấy hàng hóa
        let pick_district = "Quan Binh Thanh";     // Tên quận/huyện nơi lấy hàng hóa
        //let province = req.body.province;
        let quan = req.body.district;
        //let address = replaceNameProduct(req.body.diachi);      // Địa chỉ chi tiết của người nhận hàng
        let amount = req.body.amount;   // Số lượng sản phẩm trong giỏ hàng      
        let deliver_option = "none";    // Sử dụng phương thức vận chuyển xfast. Nhận 1 trong 2 giá trị xteam/none
        let weight = 200 * amount;      // Cân nặng của gói hàng, đơn vị sử dụng Gram

        var url = "https://thongtindoanhnghiep.co/api/district/" + quan;
        const districtDetails= await axios.get(url);
        let district = replaceNameProduct(districtDetails.data.Title);           // ( Tên quận/huyện của người nhận hàng hóa )
        let province = replaceNameProduct(districtDetails.data.TinhThanhTitle);  // ( Tên tỉnh/thành phố của người nhận hàng hóa )
        var urlFee = `https://services.giaohangtietkiem.vn/services/shipment/fee?province=${province}&district=${district}&pick_province=${pick_province}&pick_district=${pick_district}&weight=${weight}&deliver_option=${deliver_option}`;
        const shippingFee = await axios.get(urlFee, {
            headers: {
                Token: "c86FbBF0d29fD8fE2b58F3bE5e6571711CcF180a",
            },
        });
        if(shippingFee.data.success === true) {
            return res.status(200).json({ 
                status: "Success", 
                message: "Tính phí vận chuyển thành công !",
                ship: shippingFee.data.fee.fee,
                //fee: shippingFee.data.fee 
            });
        };
    } catch (error) {
        return res.status(400).json({
            status: "Fail", 
            message: "Something went wrong",
            error: error.message
        });
    };
});