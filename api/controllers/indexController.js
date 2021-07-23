const axios = require('axios');
const catchAsync = require('../utils/catchAsync');
const modelIndex = require('../models/model_index');


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