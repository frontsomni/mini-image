import { useState } from 'react'

interface CompressOptions {
  quality?: number
  outputDir?: string
}

export const useImageCompressor = (options: CompressOptions = {}) => {
  const [log, setLog] = useState<string>('')
  const { quality = 70, outputDir } = options

  const compress = async (inputPath: string) => {
    try {
      const fileName = inputPath
        .split('/')
        .pop()
        ?.replace(/(\.\w+)$/, '_compressed$1')
      const outputPath = outputDir
        ? `${outputDir}/${fileName}`
        : inputPath.replace(/(\.\w+)$/, '_compressed$1')

      const result = await window.electronAPI.compressFile({
        fileInputPath: inputPath,
        quality
      })

      if (result.code === 1) {
        setLog(`✅ 压缩成功: ${result.data}`)
      } else {
        setLog(`❌ 压缩失败: ${result.message}`)
      }

      return result
    } catch (error: any) {
      setLog(`❌ 压缩出错: ${error.message}`)
      throw error
    }
  }

  const handleCompressFile = async () => {
    try {
      const fileHandles = await window.electronAPI.selectFile()
      if (!fileHandles?.length) {
        setLog('⚠️ 没有选择文件')
        return
      }

      await compress(fileHandles[0])
    } catch (error: any) {
      setLog(`❌ 选择文件失败: ${error.message}`)
    }
  }

  return {
    log,
    compress,
    handleCompressFile
  }
}
