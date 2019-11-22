var nguoiDungService = new NguoiDungService();

function themNguoiDungTest(){
    console.log("Thêm người dùng thành công!");
}

getListUser();
function getListUser(){
    nguoiDungService.layDanhSachNguoiDung()
    .then(function(result){
        // console.log(result);
        // // result khi consle se thay no la object
        // this.mangNguoiDung = result.data;
        renderTable(result.data);
        setLocalStorage(result.data);
    })
    .catch(function(errors){
        console.log(errors);
    })
    //console.log(this.mangNguoiDung);;
    
}
function getE(id){
    return document.getElementById(id);
    
}

function renderTable(mangNguoiDung){
    console.log(nguoiDungService.mangNguoiDung);
    var content = "";
    mangNguoiDung.map(function(item,index){
        //  `String Template`
        content += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.taiKhoan}</td>
                <td>${item.matKhau}</td>
                <td>${item.hoTen}</td>
                <td>${item.email}</td>
                <td>${item.soDT}</td>
                <td>${item.maLoaiNguoiDung}</td>

                <td> 
                <button id="btnSuaNguoiDung" class="btn btn-success" data-toggle="modal"
                data-target="#myModal" onclick="suaNguoiDung('${item.id}')" > Sửa </button>
                <button class="btn btn-danger" onclick="xoaNguoiDung('${item.id}')" > Xóa </button>
                </td>
            </tr>
        `;
    });

    getE("tblDanhSachNguoiDung").innerHTML = content;
}

getE("btnThemNguoiDung").addEventListener("click",function(){
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm Người Dùng";

    var footer = `
    <button class="btn btn-success" onclick = "ThemNguoiDung()"> Thêm </button>
    `;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
})

// Chuc nang them nguoi dung
function ThemNguoiDung(){
    var taiKhoan = getE("TaiKhoan").value;
    var hoTen = getE("HoTen").value;
    var matKhau = getE("MatKhau").value;
    var email = getE("Email").value;
    var sdt = getE("SoDienThoai").value;
    var loaiNguoiDung = getE("loaiNguoiDung").value;
    
    var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, sdt, loaiNguoiDung);
    // console.log(nguoiDung);
    nguoiDungService.themNguoiDung(nguoiDung)
    .then(function(result){
        console.log(result);
        // Load lại trang nếu thành công
        // location.reload;
        getListUser();
        alert("Thêm người dùng thành công!");
    })
    .catch(function(error){
        console.log(error)
    });
}

// Chức năng xóa nhân viên
function xoaNguoiDung(id){
    console.log(id);
    nguoiDungService.xoaNguoiDung(id)
    .then(function(result){
        alert("Xóa người dùng thành công!");
        getListUser(); 
    })
    .catch(function(error){
        console.log(error)
    });
}

//Chức năng sửa nhân viên
function suaNguoiDung(id){
    document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa Người Dùng";
    var footer = `<button class="btn btn-success" onclick = "capNhatNguoiDung(${id})"> Cập nhật </button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
    
    nguoiDungService.layThongTinNguoiDung(id)
    .then(function(result){
        console.log(result.data);
        getE("TaiKhoan").value = result.data.taiKhoan;
        getE("HoTen").value = result.data.hoTen;
        getE("MatKhau").value = result.data.matKhau;
        getE("Email").value = result.data.email;
        getE("SoDienThoai").value = result.data.soDT;
        getE("loaiNguoiDung").value = result.data.maLoaiNguoiDung;
    })
    .catch(function(error){
        console.log(error);   
    })
}
function capNhatNguoiDung(id){
    console.log(id);
    var taiKhoan = getE("TaiKhoan").value;
    var hoTen = getE("HoTen").value;
    var matKhau = getE("MatKhau").value;
    var email = getE("Email").value;
    var sdt = getE("SoDienThoai").value;
    var loaiNguoiDung = getE("loaiNguoiDung").value;
    
    var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, sdt, loaiNguoiDung);
    console.log(nguoiDung);
    nguoiDungService.capNhatNguoiDung(id, nguoiDung)
    .then(function(result){
        console.log(result);
        getListUser();
        alert("Cập nhật thành công");
    })
    .catch(function(err){
        console.log(err);
    })
}

// Tìm kiếm người dùng
getE("txtSearch").addEventListener("keyup", function(){
    var chuoiTimKiem = getE("txtSearch").value;
 
    var danhSachNguoiDung = getLocalStorage();
    
   var mangTimKiem = nguoiDungService.timKiemNguoiDung(chuoiTimKiem, danhSachNguoiDung);
    renderTable(mangTimKiem);
})

function setLocalStorage(layDanhSachNguoiDung){
    localStorage.setItem("DSND", JSON.stringify(layDanhSachNguoiDung));
}

function getLocalStorage(){
    return JSON.parse(localStorage.getItem("DSND"));
}



