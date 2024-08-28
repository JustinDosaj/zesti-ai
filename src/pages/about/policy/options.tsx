import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { ReactNode } from 'react';

export const options = {
    renderMark: {
        [MARKS.BOLD]: (text: ReactNode) => <strong>{text}</strong>,
        // Add other marks like italic, underline, etc.
      },
      renderNode: {
        [BLOCKS.HEADING_1]: (node: any, children: ReactNode) => (
          <h1 className="text-4xl font-bold mb-4">{children}</h1>
        ),
        [BLOCKS.HEADING_2]: (node: any, children: ReactNode) => (
          <h2 className="text-3xl font-semibold mb-3">{children}</h2>
        ),
        [BLOCKS.HEADING_3]: (node: any, children: ReactNode) => (
          <h3 className="text-2xl font-semibold mb-2">{children}</h3>
        ),
        [BLOCKS.PARAGRAPH]: (node: any, children: ReactNode) => (
          <p className="mb-4">{children}</p>
        ),
        [BLOCKS.UL_LIST]: (node: any, children: ReactNode) => (
          <ul className="list-disc list-outside  mb-4">{children}</ul>
        ),
        [BLOCKS.OL_LIST]: (node: any, children: ReactNode) => (
          <ol className="list-decimal list-outside  mb-4">{children}</ol>
        ),
        [BLOCKS.LIST_ITEM]: (node: any, children: ReactNode) => (
          <li className="ml-4">{children}</li>
        ),
        // Add other block types like quotes, embedded entries, etc.
      },
}

export interface PolicyProps {
    content: any;
}