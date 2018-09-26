import Jimp from 'jimp'
import skmeans from 'skmeans'
import rgbToHsl from 'rgb-to-hsl'

export function get_colors(img_path) {
    return Jimp.read(img_path).then(image => {
        var pixels = []
        image.resize(100, 100)
        image.scan(0, 0, 100, 100, function(x, y, idx) {
                pixels.push(
                    [
                        this.bitmap.data[idx + 0],
                        this.bitmap.data[idx + 1],
                        this.bitmap.data[idx + 2],
                    ]
                )
            })
        
        var colors = skmeans(pixels, 3).centroids.map(color => rgbToHsl(color[0], color[1], color[2]))
        colors.sort((color1, color2) => color1[2].substring(0, color1.length-2) - color2[2].substring(0, color2.length-2))
        colors = [colors[0], colors[2]]
        return colors.map(
            (color) => `hsl(${color[0]}, ${color[1]}, ${color[2]})`
        )
    })
}