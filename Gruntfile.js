module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		/*监听文件改变，执行命令*/
		watch: {
			build: {
				files: ['src/css/*.css', 'src/js/*.js'],
				tasks: ['csslint', 'jshint', 'concat', 'cssmin', 'uglify'],
				options: {
					spawn: false
				}
			}
		},
		/*css代码扫描*/
		csslint: {
			options: {
				csslintrc: '.csslint'
			},
			build: ['src/css/*.css']
		},
		/*js扫描*/
		jshint: {
			options: {
				jshintrc: '.jshint'
			},
			build: ['src/js/*.js']
		},
		/*合并*/
		concat: {
			options: {
				stripBanners: true,
				/*合并时允许输出头部信息*/
				banner: '/*!<%= pkg.name %> - <%= pkg.version %>-' + '<%=grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			cssbuild: {
				src: 'src/css/*.css',
				dest: 'dest/<%= pkg.name %>.css'
			},
			jsbuild: {
				src: 'src/jss/*.css',
				dest: 'dest/<%= pkg.name %>.js'
			}
		},
		/*js压缩*/
		uglify: {
			options: {
				stripBanners: true, //合并时允许输出头部信息
				banner: '/*!<%= pkg.name %> - <%= pkg.version %>-' + '<%=grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			bulid: {
				files: [{
					"dest/<%= pkg.name %>.min.js": ['<%= concat.jsbuild.dest %>']
				}]
			}
		},
		/*css压缩*/
		cssmin: {
			options: {
				stripBanners: true, //合并时允许输出头部信息
				banner: '/*!<%= pkg.name %> - <%= pkg.version %>-' + '<%=grunt.template.today("yyyy-mm-dd") %> */\n',
				beautify: {
					ascii_only: true
				}
			},
			build: {
				files: [{
					"dest/<%= pkg.name %>.min.css": ['<%= concat.cssbuild.dest %>']
				}]
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	/*先执行检查css文件、js文件，然后合并，再压缩，然后监听文件改变*/
	grunt.registerTask('default', ['csslint', 'jshint', 'concat', 'cssmin', 'uglify', 'watch']);
}