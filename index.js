// express
var express = require('express');
var app = express();

var passport = require('passport');

// body parser
var bodyparser = require('body-parser');

// for partials template
var exhbs = require('express-handlebars')

// session
var session = require('express-session');

// koneksi
var koneksi = require('./koneksi');

var conn = koneksi.myConnection();

// moment
var moment = require('moment');

var Handlebars = require('handlebars');

// md5

var md5 = require('md5');

// function(){

app.use(express.static(__dirname+'/public'));

// set view engine

app.set('view engine', 'hbs');

// set partials template engine

app.engine('hbs', exhbs({extname: '.hbs', defaultLayout: 0}));

// body parser

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));


// set session
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


// ----------------------------INDEX PAGE

app.get('/', function(req, res){
	res.render('index');
});

// ---------------------------END INDEX PAGE

//--------------------------------------------AUTH SECTION--------------------------------------------------------------------\\

app.get('/loginAdmin', function(req, res){
	res.render('loginAdmin');
});

app.get('/loginKaryawan', function(req, res){
	res.render('loginKaryawan');

})

app.post('/authKaryawan', function(req, res){
	var username = req.body.username;
	var password = req.body.password;

	var md5pass = md5(password);

	if (username && password) {
		conn.query("SELECT * FROM karyawan WHERE username = ? AND password = ? ", [username,md5pass], function(err, results, fields){
			if (err) throw err;
			if (results.length){
				req.session.karyawan = true;
				req.session.userK = username;
				res.redirect("/homeKaryawan");
			}else{
				res.send("invalid login details!");
				res.end();

			}

			res.end();
		})
	}
});

// 

// 

app.get('/homeKaryawan', function(req, res){
	if (req.session.karyawan){
		var ajuanBarang = "SELECT COUNT(id) AS jajuan FROM ajuan WHERE val='1'";
		var barangKeluar = "SELECT COUNT(id) AS jkeluar FROM barang_keluar";
		conn.query(ajuanBarang, (err, ajuanBarang)=>{
			if (err) throw err;
			conn.query(barangKeluar, (err, barangKeluar)=>{
				if (err) throw err;
				res.render('karyawan/dashboard', {users: req.session.userK, ajuanBarang: ajuanBarang, barangKeluar: barangKeluar})
			})
		})
		
	}else{
		res.send("you should login");
	}
})

app.post('/auth', function(req, res){
	var username = req.body.username;
	var password = req.body.password;

	var md5pass = md5(password);

	if (username && password){
		conn.query("SELECT * FROM users WHERE username = ? AND password = ? ", [username,md5pass], function(err, results, fields){
			if (err) throw err;
			var nama = console.log(results.nama);
			if (results.length > 0) {
				req.session.start = true;
				req.session.username = nama;
				res.redirect('/home');
			}else{
				res.send('invalid login details');
				res.end()
			}
			res.end()
		});
	}else{
		res.send('please insert your login details!');
		res.end()
	}

});


// dashboard
app.get('/home', function(req, res){
	if (req.session.start) {
		var jumlahKaryawan = "SELECT COUNT(id) AS jkaryawan FROM karyawan";
		var jumlahSupplier = "SELECT COUNT(id) AS jsup FROM supplier";
		var jumlahRak = "SELECT COUNT(idrak) AS jrak FROM rak";
		var jumlahBarang = "SELECT COUNT(id) AS jbrg FROM barang";
		var ajuanBarang = "SELECT COUNT(id) AS jajuan FROM ajuan WHERE val='1'";
		var barangKeluar = "SELECT COUNT(id) AS jkeluar FROM barang_keluar";

		conn.query(jumlahKaryawan, (err, jumlahKaryawan)=>{
			if (err) throw err;
			conn.query(jumlahSupplier, (err, jumlahSupplier)=>{
				if (err) throw err;
				conn.query(jumlahRak, (err, jumlahRak)=>{
					if (err) throw err;
					conn.query(jumlahBarang, (err, jumlahBarang)=>{
						if (err) throw err;
						conn.query(ajuanBarang, (err, ajuanBarang)=>{
							if(err) throw err;
							conn.query(barangKeluar, (err, barangKeluar)=>{
								if (err) throw err;
								res.render("admin/dashboard", {users: req.session.username, 
								jumlahKaryawan: jumlahKaryawan,
								jumlahSupplier: jumlahSupplier,
								jumlahRak: jumlahRak,
								jumlahBarang: jumlahBarang,
								ajuanBarang: ajuanBarang,
								barangKeluar: barangKeluar });	
							})
					
							
						})
						
					})
				})

			})
				
		})
		
	}else{
		res.send("you should login!");
	}
})


//--------------------------------------------END AUTH SECTION--------------------------------------------------------------------\\ 


// -----------------------------------------------------------------KARYAWAN SECTION---------------------------------------\\

// data karyawan
app.get('/karyawan', function(req, res){
	if (req.session.start) {
		
		var sql = "SELECT * FROM karyawan";
		var query = conn.query(sql, function(err, results){
			if (err) throw err;
			res.render('admin/karyawan', {users: req.session.username, results: results});
		})
	
			
		
	}else{
		res.send("you should login!");
	}

});


// simpan data karyawan

app.post('/saveKaryawan', function(req, res){
	var password = md5(req.body.password);
	var data = {
		'nama': req.body.nama,
		'username': req.body.username,
		'password': password,
		'alamat': req.body.alamat,
		'notlp': req.body.notlp
	};

	var sql = "INSERT INTO karyawan SET ?";
	var query = conn.query(sql, data, function(err, results){
		if (err) throw err;
		res.redirect('/karyawan');
	});
})


// hapus data karyawan

app.get('/hapusKaryawan/:id', function(req, res){
	var id = req.params.id;
	var sql = "DELETE FROM karyawan WHERE id='"+id+"'";
	var query = conn.query(sql, function(err, results){
		if (err) throw err;
		res.redirect('/karyawan');
	});
})


// --------------------------------------------------------------END KARYAWAN SECTION--------------------------------------------\\

// --------------------------------------------------------------SUPPLIER SECTION----------------------------------------------\\
app.get('/supplier', function(req, res){
	if (req.session.start) {
		var sql = "SELECT * FROM supplier";
		var query = conn.query(sql, function(err, results){
		res.render('admin/supplier', {users: req.session.username, results: results});	
    	})
	}
	
	
});

app.post('/saveSupplier', function(req, res){
	var data = {
		'nama': req.body.nama,
		'alamat': req.body.alamat,
		'kontak': req.body.kontak
	};

	var sql = "INSERT INTO supplier SET ? ";
	var query = conn.query(sql, data, function(err, results){
		if (err) throw err;
		res.redirect('/supplier');
	});
});

app.get('/hapusSupplier/:id', function(req, res){
	var id = req.params.id;

	var sql = "DELETE FROM supplier WHERE id = '"+id+"'";
	var query = conn.query(sql, function(err, results){
		if (err) throw err;
		res.redirect('/supplier');
	})
});

app.post('/updateSupplier', function(req, res){
	var id = req.body.id;
	var nama = req.body.nama;
	var alamat = req.body.alamat;
	var kontak = req.body.kontak;

	var sql = "UPDATE supplier SET nama = '"+nama+"', alamat='"+alamat+"', kontak='"+kontak+"' WHERE id='"+id+"'";
	var query = conn.query(sql, function(err, results){
		res.redirect('/supplier');
	})
})
// --------------------------------------------------------------END SUPPLIER SECTION----------------------------------------------\\
// ------------------------------------------------------------RAK SECTION----------------------------------------------------------\\


app.get('/rak', function(req, res){
	if (req.session.start) {
		var sql = "SELECT * FROM rak";
		var query = conn.query(sql, function(err, results){
			res.render('admin/rak', {users: req.session.username, results: results});
		})
	}
})



app.post('/saveRak', function(req, res){
	var data = {
		'kdrak': req.body.kdrak,
		'nama': req.body.nama
	};

	var sql = "INSERT INTO rak SET ?";
	var query = conn.query(sql, data, function(err, results){
		if (err) throw err;
		res.redirect('/rak');
	})
})

app.get('/hapusRak/:id', function(req, res){
	var id = req.params.id;
	var sql = "DELETE FROM rak WHERE id = '"+id+"'";
	var query = conn.query(sql, function(err, results){
		if (err) throw err;
		res.redirect('/rak');
	})
});

app.post('/updateRak', function(req, res){
	var id = req.body.id;
	var kdrak = req.body.kdrak;
	var nama = req.body.nama;

	var sql = "UPDATE rak SET kdrak = '"+kdrak+"', nama='"+nama+"' WHERE id = '"+id+"'";
	var query = conn.query(sql, function(err, results){
		if (err) throw err;
		res.redirect('/rak');
	});
})


// ------------------------------------------------------------EBD RAK SECTION----------------------------------------------------------\\

// --------------------------------------------------------------BARANG SECTION-------------------------------------------------\\

app.get('/barang', function(req, res){

	if (req.session.start) {
		var sql = "SELECT * FROM barang";
		var supplier = "SELECT * FROM supplier";
		var rak = "SELECT * FROM rak";
		

		var query = conn.query(sql, function(err, results,){
			if (err) throw err;
			conn.query(supplier, function(err, supplier){
				if (err) throw err;
				conn.query(rak, function(err, rak){
					if (err) throw err;
					res.render('admin/barang', {users: req.session.username, results: results, supplier: supplier, rak: rak});
				})
			})
		})
	}
	
})

app.post('/saveBarang', function(req, res){
	var data = {
		'kdbrg': req.body.kdbrg,
		'nama': req.body.nama,
		'jumlah': req.body.jumlah,
		'supplier': req.body.supplier,
		'rak': req.body.rak

	}

	var sql = "INSERT INTO barang SET ? ";
	var query = conn.query(sql, data, function(err, results){
		if (err) throw err;
		res.redirect('/barang');
	})
})

app.get('/hapusBarang/:id', function(req, res){
	var id = req.params.id;

	var sql = "DELETE FROM barang WHERE id='"+id+"'";
	var query = conn.query(sql, function(err, results){
		if (err) throw err;
		res.redirect('/barang');
	})
})

app.post('/updateBarang', function(req, res){
	var id = req.body.id;
	var kdbrg = req.body.kdbrg;
	var nama = req.body.nama;
	var jumlah = req.body.jumlah;
	var supplier = req.body.supplier;
	var rak = req.body.rak;

	var sql = "UPDATE barang SET kdbrg='"+kdbrg+"', nama='"+nama+"', jumlah='"+jumlah+"', supplier='"+supplier+"', rak='"+rak+"' WHERE id='"+id+"'";
	var query = conn.query(sql, function(err, results){
	if (err) throw err;
	res.redirect('/barang');
	})
});


// --------------------------------------------------------------BARANG SECTION-------------------------------------------------\\








// ------------------------------------------------KARYAWAN SECTION----------------------------------------------------\\


app.get('/barangMasuk', function(req, res){
	if (req.session.karyawan) {
		var sql = "SELECT * FROM barang_masuk";
		var query = conn.query(sql, function(err, results){
			res.render('karyawan/barangMasuk', {results: results, users: req.session.userK});
		})
	}else{
		res.send("you should login!");
	}
})


app.get('/addBarangMasuk', function(req, res){
	if (req.session.karyawan) {
		var barang = "SELECT * FROM barang";
		var query = conn.query(barang, function(err, results){
			if (err) throw err;

			res.render('karyawan/add_barang_masuk', {users: req.session.userK, results: results});


		})


		
	}
})

app.post('/saveBarangMasuk', function(req, res){
	var data = {
		'kdbrg': req.body.kdbrg,
		'nmbrg': req.body.nmbrg,
		'supplier': req.body.supplier,
		'jmlbrg': req.body.jmlbrg,
		'jmlmasuk': req.body.jmlmasuk
	}

	var jmlbrg = parseInt(req.body.jmlbrg);
	var jmlmasuk = parseInt(req.body.jmlmasuk);
	var totalmasuk = jmlbrg + jmlmasuk;

	var updateBarang = "UPDATE barang SET jumlah='"+totalmasuk+"' WHERE kdbrg = '"+req.body.kdbrg+"'";

	var sql = "INSERT INTO barang_masuk SET ?";
	var query = conn.query(updateBarang, function(err, results){
		if (err) throw err;
		conn.query(sql, data, function(err, save){
			if (err) throw err;
			res.redirect('/barangMasuk');
		})
	})
	
})


app.get('/hapusBarangMasuk/:id', function(req, res){
	var id = req.params.id;

	var sql = "DELETE FROM barang_masuk WHERE id ='"+id+"'";
	var query = conn.query(sql, function(err, results){
		if (err) throw err;
		res.redirect('/barangMasuk');
	})
})



// ------------------------------------------------END BAFANG MASUK SECTION----------------------------------------------------\\


// ------------------------------------------------AJUAN BARANG SECTIONN-------------------------------------------------------

app.get('/ajuan', function(req, res){
	if (req.session.karyawan) {
		var sql = "SELECT * FROM ajuan";
		var query = conn.query(sql, function(err, results){
			if (err) throw err;
			res.render('karyawan/ajuan', {users: req.session.userK, results: results});
		})
	}else{
		res.send('you should login!');
	}
})

app.get('/addAjuan', function(req, res){
	if (req.session.karyawan) {
		var sql = "SELECT * FROM barang";
		var query = conn.query(sql, function(err, results){
			if (err) throw err;
			res.render('karyawan/add_ajuan', {users: req.session.userK, results: results});
		});
	}else{
		res.send('you should login!');
	}
})

app.post('/saveBarangAjuan', function(req, res){
	var data = {
		'kdajuan': req.body.kdajuan,
		'kdbrg': req.body.kdbrg,
		'nmbrg': req.body.nmbrg,
		'supplier': req.body.supplier,
		'jmlbrg': req.body.jmlbrg,
		'jmlajuan': req.body.jmlajuan,
		'tglajuan': req.body.tglajuan,
		'val': '1'
	};

	var jumlahBrg = parseInt(req.body.jmlbrg);
	var jumlahAjuan = parseInt(req.body.jmlajuan);

	conn.query("SELECT * FROM ajuan WHERE kdbrg= ? AND val= ? ", [req.body.kdbrg,1], function(err, check){
		if (err) throw err;
			if (check.length > 0){
				res.redirect("/ajuanError2");
			}else if (jumlahAjuan > jumlahBrg) {
				res.redirect("/ajuanError");
			}else{
				var sql = "INSERT INTO ajuan SET ?";
				var query = conn.query(sql, data, function(err, results){{
				if (err) throw err;
				res.redirect('/ajuan');
		}})
		}
	})

	

	
})


app.get('/hapusAjuan/:id', (req, res)=> {
	var id = req.params.id;
	var sql = "DELETE FROM ajuan WHERE id = '"+id+"'";
	conn.query(sql, (err, results)=> {
		if (err) throw err;
		res.redirect('/ajuan');
	})
})

// pesan error ajuan
app.get('/ajuanError', function(req, res){
	if (req.session.karyawan){
		if (req.session.karyawan) {
		var sql = "SELECT * FROM barang";
		var query = conn.query(sql, function(err, results){
			if (err) throw err;
			res.render('karyawan/add_ajuan', {users: req.session.userK,
			 results: results, 
			 error: true, 
			 message: "Jumlah ajuan tidak boleh lebih dari jumlah barang!"});
		});
	}else{
		res.send('you should login!');
	}
	}
})

app.get('/ajuanError2', function(req, res){
	if (req.session.karyawan){
		if (req.session.karyawan) {
		var sql = "SELECT * FROM barang";
		var query = conn.query(sql, function(err, results){
			if (err) throw err;
			res.render('karyawan/add_ajuan', {users: req.session.userK,
			 results: results, 
			 error: true, 
			 message: "Tidak Boleh Ada Barang Yang Sama Dalam Satu Ajuan"});
		});
	}else{
		res.send('you should login!');
	}
	}
})
// 

// -----------------------------------------------END AJUAN BARANG SECTION (admin)--------------------------------------------------------



// -----------------------------------------------BARANG KELUAR SECTION----------------------------------------------------------

app.get('/barangKeluar', function(req, res){
	if (req.session.start) {
		var sql = "SELECT * FROM barang_keluar";
		conn.query(sql, function(err, results){
			res.render('admin/barang_keluar', {users: req.session.username, results: results});
		})
	}else{
		res.send('you should login!');
	}
})


app.get('/addBarangKeluar', function(req, res){
	if (req.session.start) {
		var sql = "SELECT * FROM ajuan WHERE val='1'";
		conn.query(sql, function(err, results){
			if (err) throw err;
			res.render('admin/add_barang_keluar', {users: req.session.username, results: results});
		})
	}
})


app.post('/saveBarangKeluar', function(req, res){
	var data = {
		'kdajuan': req.body.kdajuan,
		'kdbrg': req.body.kdbrg,
		'nmbrg': req.body.nmbrg,
		'supplier': req.body.supplier,
		'jmlbrg': req.body.jmlbrg,
		'jmlajuan': req.body.jmlajuan,
		'jmlkeluar': req.body.jmlkeluar,
		'tglajuan': req.body.tglajuan,
		'tglkeluar': req.body.tglkeluar

	}

	var jmlbrg = parseInt(req.body.jmlbrg);
	var jmlajuan = parseInt(req.body.jmlajuan);
	var jmlkeluar = parseInt(req.body.jmlkeluar);
	var total = jmlbrg - jmlkeluar;
	var val = 0;
	// Update Jumlah Barang

	var update = "UPDATE barang SET jumlah='"+total+"' WHERE kdbrg='"+req.body.kdbrg+"'";

	// save barang keluar

	var save = "INSERT INTO barang_keluar SET ? ";

	// update validasi

	var updateVal = "UPDATE ajuan SET val='"+val+"' WHERE kdajuan='"+req.body.kdajuan+"'" ;


	if (jmlkeluar > jmlajuan) {
		res.redirect('/barangKeluarError')
	}else{
		conn.query(updateVal, function(err, val){
			if (err) throw err;
			conn.query(update, function(err, results){
				if (err) throw err;
				conn.query(save, data, function(err, save){
					if (err) throw err;
						res.redirect('/barangKeluar');
		})
	})	
		})
		
	}

	

})


app.get('/barangKeluarError', function(req, res){
	if (req.session.start) {
		var sql = "SELECT * FROM ajuan WHERE val='1'";
		conn.query(sql, function(err, results){
			if (err) throw err;
			res.render('admin/add_barang_keluar', {users: req.session.username, results: results, error: true, message: "jumlah keluar tidak boleh lebih dari jumlah ajuan!"});
		})
	}
})


app.get('/hapusBarangKeluar/:id', function(req, res){
	var id = req.params.id;
	var sql = "DELETE FROM barang_keluar WHERE id='"+id+"'";
	conn.query(sql, function(err, results){
		if (err) throw err;
		res.redirect('/barangKeluar');
	})
})


// ----------------------------------------------END BARANG KELUAR SECTION-------------------------------------------------------

// ---------------------------------------------PRINT AND EXPORT DOCS SECTION----------------------------------------------------

app.get('/printstat', function(req, res){
	if (req.session.start) {
		var jumlahKaryawan = "SELECT COUNT(id) AS jkaryawan FROM karyawan";
		var jumlahSupplier = "SELECT COUNT(id) AS jsup FROM supplier";
		var jumlahRak = "SELECT COUNT(idrak) AS jrak FROM rak";
		var jumlahBarang = "SELECT COUNT(id) AS jbrg FROM barang";
		var ajuanBarang = "SELECT COUNT(id) AS jajuan FROM ajuan WHERE val='1'";
		var barangKeluar = "SELECT COUNT(id) AS jkeluar FROM barang_keluar";

		conn.query(jumlahKaryawan, (err, jumlahKaryawan)=>{
			if (err) throw err;
			conn.query(jumlahSupplier, (err, jumlahSupplier)=>{
				if (err) throw err;
				conn.query(jumlahRak, (err, jumlahRak)=>{
					if (err) throw err;
					conn.query(jumlahBarang, (err, jumlahBarang)=>{
						if (err) throw err;
						conn.query(ajuanBarang, (err, ajuanBarang)=>{
							if(err) throw err;
							conn.query(barangKeluar, (err, barangKeluar)=>{
								if (err) throw err;
								res.render("print/printstat", {users: req.session.username, 
								jumlahKaryawan: jumlahKaryawan,
								jumlahSupplier: jumlahSupplier,
								jumlahRak: jumlahRak,
								jumlahBarang: jumlahBarang,
								ajuanBarang: ajuanBarang,
								barangKeluar: barangKeluar });	
							})
					
							
						})
						
					})
				})

			})
				
		})
	}else{
		res.send("you should login!");
	}
})

// ---------------------------------------------END PRINT AND EXPORT DOCS SECTION----------------------------------------------------





// ------------------------------------------------END PROGRAM + LOGOUT
app.get('/logout', function(req, res){
	
		req.session.destroy();
		res.redirect('/');
	
	
})

app.get('/logoutKaryawan', function(req, res){
	req.session.destroy();
	res.redirect('/');
})


app.listen(8000, function(){
	console.log('server run on port 8000');
})
