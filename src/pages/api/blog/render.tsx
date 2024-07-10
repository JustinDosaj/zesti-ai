import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, Block, Inline } from '@contentful/rich-text-types';
import Image from "next/image"

export const renderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline ) => {
        const { file, title } = (node.data.target as any).fields;
        const imageUrl = file.url;
        const finalImageUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;
  
        return <Image height={900} width={1600} src={finalImageUrl} alt={title} className="w-full object-scale-down max-h-[900px] max-w-[1600px] rounded-lg mb-4 mt-4"/>;
      },
    },
};

export const renderContentBlock = (block: any) => {
    switch (block.fields.blockType) {
      case 'Text':
        return <div>{documentToReactComponents(block.fields.textContent)}</div>;
      case 'Image':
        const imageUrl = block.fields.singleImage.fields.file.url;
        const finalImageUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;
        return <Image src={finalImageUrl} alt={block.fields.imageDescription} width={1600} height={900} className="w-full object-scale-down max-h-[900px] max-w-[1600px] rounded-lg mb-4 mt-4" />;
      case 'Image Gallery':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {block.fields.imageGallery.map((img: any) => {
              const galleryImageUrl = img.fields.file.url;
              const galleryFinalImageUrl = galleryImageUrl.startsWith('//') ? `https:${galleryImageUrl}` : galleryImageUrl;
              return <Image key={img.sys.id} src={galleryFinalImageUrl} alt={img.fields.description} width={1600} height={900} className="w-full object-scale-down max-h-[900px] max-w-[1600px] rounded-lg mb-4 mt-4" />;
            })}
          </div>
        );
      case 'Video':
        return <iframe src={block.fields.videoUrl} frameBorder="0" className="w-full h-64 md:h-96 my-4"></iframe>;
      case 'Code Snippet':
        return <pre className="bg-gray-100 p-4 rounded my-4">{block.fields.codeSnippet}</pre>;
      default:
        return null;
    }
  };