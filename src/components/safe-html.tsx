import { Children } from "react";
import SanitizeHTML from "sanitize-html";
import "../app/globals.css";
import { cn } from "@/lib/utils";

interface SafeHTMLProps {
  children: string
  className?: string
}

const SafeHTML = ({
  children,
  className
}: SafeHTMLProps) => {
  const unsafe = Children.toArray(children)
    .filter((child) => typeof child === 'string')
    .join('')

    let escaped = SanitizeHTML(unsafe, {
      allowedTags: [
        "blockquote",
        "h1",
        "h2",
        "h3",
        "p",
        "ul",
        "ol",
        "li",
        "b",
        "i",
        "strong",
        "em",
        "strike",
        "del",
        "br",
        "div",
        "sup",
        "sub",
      ],
      allowedAttributes: {
        a: ["href", "name", "target"],
        img: ["src"],
      },
      // Lots of these won't come up by default because we don't allow them
      selfClosing: [],
      // URL schemes we permit
      allowedSchemes: [],
      allowedSchemesByTag: {},
    });
  return (
    <div
      className={cn("entry", className)}
      dangerouslySetInnerHTML={{ __html: escaped }}
    />
  )
}

export default SafeHTML