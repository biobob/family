const gulp = require('gulp'),
      debug = require('gulp-debug'),
      log = require('fancy-log'),
      ftp = require('vinyl-ftp'),
      min_htm = require('gulp-htmlmin'),
      min_css = require('gulp-clean-css'),
      min_ecs = require('gulp-terser'),
      header = require('gulp-header'),
      
      banner = [
          '/*',
          ' *',
          ' * Yo Dog, I heard you like digging into source code.',
          ' *',
          ' * So I put the GitHub link of this open source web page here:',
          ' *     https://github.com/biobob/family',
          ' *',
          ' */',
          ''
      ].join('\n')
      
      conf = {
          paths: {
              src: {
                  htm: './src/htm/*.html',
                  css: './src/css/*.css',
                  ecs: './src/ecs/*.js',
                  img: './src/img/*.*'
              },
              dist: './dist'
          },
          ftp: {
              connection: ftp.create({
                  host:        process.env.FTP_HOST,
                  user:        process.env.FTP_USER,
                  password:    process.env.FTP_PASS,
                  log:         log,
                  idleTimeout: 10000
              })
          }
      },
      
      htm = () => gulp
          .src(conf.paths.src.htm)
          .pipe(debug({title: 'Debug htm:'}))
          .pipe(min_htm({ collapseWhitespace: true }))
          .pipe(gulp.dest(conf.paths.dist)),
      
      css = () => gulp
          .src(conf.paths.src.css)
          .pipe(debug({title: 'Debug css:'}))
          .pipe(min_css())
          .pipe(header(banner))
          .pipe(gulp.dest(conf.paths.dist)),
      
      ecs = () => gulp
          .src(conf.paths.src.ecs)
          .pipe(debug({title: 'Debug ecs:'}))
          .pipe(min_ecs())
          .pipe(header(banner))
          .pipe(gulp.dest(conf.paths.dist)),

      copy = () => gulp
          .src(conf.paths.src.img)
          .pipe(debug({title: 'Debug copy:'}))
          .pipe(gulp.dest(conf.paths.dist)),
      
      deploy = () => gulp
        .src([conf.paths.dist + '/**'], {base: conf.paths.dist, buffer: false})
        .pipe(debug({title: 'Debug ftp:'}))
        .pipe(conf.ftp.connection.dest('/web'));

// default task (called from CLI when executing `gulp`)
gulp.task('default', gulp.series(gulp.parallel(htm, css, ecs, copy), deploy));
