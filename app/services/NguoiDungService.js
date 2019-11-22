// Khi dụng tới link API sẽ bị "bất đồng bộ"
function NguoiDungService(){
    this.layDanhSachNguoiDung = function(){
       return axios({
            method: "GET",
            url: "http://5dce9e1075f9360014c26006.mockapi.io/api/NguoiDung"
        })   
    }
    this.themNguoiDung = function(NguoiDung){
        return axios({
            method: "POST",
            url: "http://5dce9e1075f9360014c26006.mockapi.io/api/NguoiDung",
            data: NguoiDung,
        })
    }
    this.xoaNguoiDung = function(id){
        return axios({
            method: "DELETE",
            // url: "http://5dce9e1075f9360014c26006.mockapi.io/api/NguoiDung/" + id
            url: `http://5dce9e1075f9360014c26006.mockapi.io/api/NguoiDung/${id}`
        })
    }
    this.layThongTinNguoiDung = function(id){
        return axios({
            method: "GET",
            // url: "http://5dce9e1075f9360014c26006.mockapi.io/api/NguoiDung/" + id
            url: `http://5dce9e1075f9360014c26006.mockapi.io/api/NguoiDung/${id}`
        })
    }
    this.capNhatNguoiDung = function(id, user){
        console.log(id);
        return axios({
            method: "PUT",
            url: `http://5dce9e1075f9360014c26006.mockapi.io/api/NguoiDung/${id}`,
            data: user
        })
    }
    this.timKiemNguoiDung = function(chuoiTimKiem, danhSachNguoiDung){
        //var mangTimKiem = danhSachNguoiDung.filter(....)
        return this.danhSachNguoiDung.filter(function(item){
            return item.hoten.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1;
        })
        //return mangTimKiem;
    }
}

