var express        =         require("express"),
	bodyParser     =         require("body-parser"),
	methodOveride  =         require("method-override"),
	mongoose       =         require("mongoose"),
	app            =         express();
// ====================mongoose Schema=============
var carSchema = new mongoose.Schema({
	carname:String,
	brandname:String,
	price:String,
	image:String,
	body:String,
	created:{type:Date,default:Date.now}
});
var Car = mongoose.model("Car",carSchema);
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost/car_app",{useNewUrlParser: true,useUnifiedTopology:true}, () => { console.log("we are connected")}).catch(err => console.log(err));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(methodOveride("_method"));
app.get("/",function(req,res){
	res.render("home");
});
app.get("/cars",function(req,res){
	Car.find({},function(err,cars){
		if(err){
			console.log(err);
		}
		else{
			res.render("cars",{cars:cars});
		}
	});
});
app.get("/cars/new",function(req,res){
	res.render("new");
})
app.post("/cars",function(req,res){
	Car.create(req.body.car,function(err,car){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/cars");
		}
	});
});
app.get("/cars/:id",function(req,res){
	Car.findById(req.params.id,function(err,car){
		if(err){
			console.log(err);
		}
		else{
			res.render("show",{car:car});
		}
	});
})
app.get("/cars/:id/edit",function(req,res){
	Car.findById(req.params.id,function(err,car){
		if(err){
			console.log(err);
		}
		else{
			res.render("edit",{car:car});
		}
	});
});
app.put("/cars/:id",function(req,res){
	Car.findByIdAndUpdate(req.params.id,req.body.car,function(err,cars){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/cars/"+req.params.id);
		}
	});
});
app.delete("/cars/:id",function(req,res){
	Car.findByIdAndRemove(req.params.id,function(err){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/cars");
		}
	})
})
app.listen(3000,function(){
	console.log("server started");
});