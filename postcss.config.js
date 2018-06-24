module.exports = {
    plugins : [
        require('autoprefixer')({
            browsers : [
            'last 5 versions',
            "iOS >= 8",
            "ie >=8",
            "Firefox >= 20",
            "Android > 4.4"]
        })
    ]
}