import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Table from "@tiptap/extension-table";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import CharacterCount from "@tiptap/extension-character-count";
import Color from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import Focus from "@tiptap/extension-focus";
import FontFamily from "@tiptap/extension-font-family";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";

import Details from "@tiptap-pro/extension-details";
import DetailsContent from "@tiptap-pro/extension-details-content";
import DetailsSummary from "@tiptap-pro/extension-details-summary";
import DragHandle from "@tiptap-pro/extension-drag-handle";
import Emoji from "@tiptap-pro/extension-emoji";
import FileHandler from "@tiptap-pro/extension-file-handler";
import Mathematics from "@tiptap-pro/extension-mathematics";
import NodeRange from "@tiptap-pro/extension-node-range";
import TableOfContents from "@tiptap-pro/extension-table-of-contents";
import UniqueId from "@tiptap-pro/extension-unique-id";
import { Root } from "hast";
import { LanguageFn } from "highlight.js";
import { Options, AutoOptions } from "lowlight";

export const Extensions = (lowlight: { highlight: (language: string, value: string, options?: Readonly<Options> | null | undefined) => Root; highlightAuto: (value: string, options?: Readonly<AutoOptions> | null | undefined) => Root; listLanguages: () => Array<string>; register: { (grammars: Readonly<Record<string, LanguageFn>>): undefined; (name: string, grammar: LanguageFn): undefined; }; registerAlias: { (aliases: Readonly<Record<string, ReadonlyArray<string> | string>>): undefined; (language: string, alias: ReadonlyArray<string> | string): undefined; }; registered: (aliasOrName: string) => boolean; }) => [
  StarterKit.configure({
    bulletList: false,
    orderedList: false,
    codeBlock: false,
  }),
  BulletList,
  OrderedList,
  CodeBlockLowlight.configure({ lowlight }),
  Table.configure({ resizable: true }),
  TableHeader,
  TableRow,
  TableCell,
  CharacterCount,
  Color,
  Document,
  Focus,
  FontFamily,
  Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
  Highlight,
  Image,
  Link.configure({ openOnClick: true }),
  Paragraph,
  Placeholder.configure({ placeholder: "Start typing your content..." }),
  Subscript,
  Superscript,
  TaskList,
  TaskItem,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  TextStyle,
  Typography,
  Underline,

  // TipTap Pro
  Details,
  DetailsContent,
  DetailsSummary,
  DragHandle,
  Emoji,
  FileHandler,
  Mathematics,
  NodeRange,
  TableOfContents,
  UniqueId,
];
