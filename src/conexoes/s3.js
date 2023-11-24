const aws = require('aws-sdk')

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3)

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY
    }
})

module.exports = {

    listFiles: async () => {

        const { Contents } = await s3.listObjects({
            Bucket: process.env.BUCKET_NAME
        }).promise()

        const files = Contents.map(file => {
            return {
                url: `https://${process.env.BUCKET_NAME}.${process.env.ENDPOINT_S3}/${file.Key}`,
                path: file.Key
            }

        })
        return files

    },

    uploadFile: async (path, buffer, mimetype) => {

        const novoArquivo = await s3.upload({
            Bucket: process.env.KEY_NAME,
            Key: path,
            Body: buffer,
            ContentType: mimetype
        }).promise()

        return ({
            url: novoArquivo.Location,
            path: novoArquivo.Key
        })
    },

    deleteFile: async (path) => {
        await s3.deleteObject({
            Bucket: process.env.KEY_NAME,
            Key: path,
        }).promise()

        return
    }
}