var gulp=require("gulp");
var gulp=require("gulp"),
jsmin=require("gulp-uglify"),
addver=require("gulp-asset-rev"),
clean=require("gulp-clean"),
changed=require("gulp-changed"),
debug=require("gulp-debug");

gulp.task("copyjs",['cleanjs'],function(){
	gulp.src("src/**/*.js")
	.pipe(debug())
	.pipe(changed("app/"))
	.pipe(debug())
	.pipe(jsmin())
	.pipe(gulp.dest("app/"));
})

gulp.task("cleanjs",function(){
	gulp.src("app/**/*.js")
	.pipe(changed("app/"))
	.pipe(clean())
})

gulp.task("addVersion",["copyjs"],function()
{
	gulp.src("src/index.html")
	.pipe(addver())
	.pipe(gulp.dest("app/"));
})

gulp.task("watchjs",function(){
	var watcher=
	gulp.watch("src/**/*.js",['addVersion']);	
	watcher.on("change",function(event){
		console.log("file:"+event.path+" was "+event.type);
		if(event.type=="deleted")
		{
			var filepath="app\\"+
				event.path.split('\\src\\')[1];
			gulp.src(filepath).pipe(clean());
		}
	})
})