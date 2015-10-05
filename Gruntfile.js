module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		configs: grunt.file.readJSON('/workspace/projects/pillakloud/configs.json'),
		clean: ["release/", ".grunt-uglify-cache-<%= pkg.name %>.json"],
		copy: {
			main: {
				options: {
					mode: true
				},
				files: [
					// includes files within path and its sub-directories 
					{
						expand: true,
						src: ['webui-aria2/**'],
						dest: 'release/'
					}, {
						src: ['README.md'],
						dest: 'release/README.md'
					}, {
						src: ['LICENSE'],
						dest: 'release/LICENSE'
					}, {
						src: ['package.json'],
						dest: 'release/package.json'
					}
				],
			},
		},
		uglify: {
			options: {
				mangle: {
					sort: true,
					toplevel: true
				},
				nameCache: '.grunt-uglify-cache-<%= pkg.name %>.json'
			},
			my_target: {
				files: [{
					expand: true,
					cwd: 'lib/',
					src: '**/*.js',
					dest: 'release/lib'
				}, {
					'release/app.js': ['app.js']
				}]
			}
		},
		compress: {
			main: {
				options: {
					mode: 'tgz',
					archive: '<%= pkg.name %>-<%= pkg.version %>.tar.gz',
				},
				files: [{
						expand: true,
						cwd: 'release/',
						src: ['**'],
						dest: '<%= pkg.name %>-<%= pkg.version %>'
					}, // makes all src relative to cwd
				]
			}
		},
		dropbox: {
			options: {
				access_token: '<%= configs.dropbox_token %>'
			},
			dev: {
				files: {
					'': ['<%= pkg.name %>-<%= pkg.version %>.tar.gz'],
				}
			}
		},
		shell: {
			publish: {
				command: [
					'cd release',
					'npm publish',
				].join('&&')
			},
			cleantgz: {
				command: 'rm *.tar.gz'
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-copy'); // load the given tasks
	grunt.loadNpmTasks('grunt-contrib-uglify'); // load the given tasks
	grunt.loadNpmTasks('grunt-contrib-clean'); // load the given tasks
	grunt.registerTask('default', ['clean', 'copy', 'uglify']); // Default grunt tasks maps to grunt
	grunt.loadNpmTasks('grunt-dropbox');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-shell');
	grunt.registerTask('npmrelease', ['default', 'shell:publish']); // Default grunt tasks maps to grunt
	grunt.registerTask('testrelease', ['default', 'compress', 'dropbox', 'shell:cleantgz']); // Upload to dropbox to test
};
