import Jimp from 'jimp'
import skmeans from 'skmeans'
import rgbHex from 'rgb-hex'

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
        return skmeans(pixels, 5).centroids.map(
            (color) => rgbHex(color[0], color[1], color[2])
        )
    })
}