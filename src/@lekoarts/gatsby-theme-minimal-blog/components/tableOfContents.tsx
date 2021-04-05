/** @jsx jsx */
import React from "react"
import useActiveId from "../hooks/use-active-id";
import { jsx, Link as TLink } from "theme-ui"

import { Link } from "gatsby"

function getIds(items) {
    return items.reduce((acc, item) => {
        if (item.url) {
            // url has a # as first character,
            // remove it to get the raw CSS-id
            acc.push(item.url.slice(1));
        }
        if (item.items) {
            acc.push(...getIds(item.items));
        }
        return acc;
    }, []);
}

function renderItems(items, activeId, isRecursiveCall?: boolean) {
    return (
        <ul
            sx={{
                listStyle: `none`,
                padding: 0,
                listStyleType: 'none',
                '&:hover': {
                    fontWeight: 'bold'
                },
                paddingInlineStart: isRecursiveCall ? '.5rem' : null,
                pl: isRecursiveCall ? 2 : null,
                variant: isRecursiveCall ? null : `styles.TableOfContentsList`,
            }}
        >
            {items.map((item) => {
                if (!item.url) {
                    return null
                }
                return (
                    <li key={item.url} sx={{ mt: isRecursiveCall ? 1 : 2 }}>
                        <TLink
                            as={Link}
                            sx={{
                                // variant: `secondary`,
                                marginY: 2,
                                fontWeight: `normal`,
                                color: `secondary`,
                                textDecoration: activeId === item.url.slice(1)
                                    ? `underline`
                                    : `null`,
                                transition: `all 100ms cubic-bezier(0.4,0,0.2,1)`
                            }}
                            to={item.url}
                            style={{

                            }}
                        >
                            {item.title}
                        </TLink>
                        {item.items && renderItems(item.items, activeId, true)}
                    </li>
                )
            })}
        </ul>
    );
}

export default function TableOfContents(props) {
    const items = props.props.tableOfContents.items
    const idList = getIds(items);
    const activeId = useActiveId(idList);

    return (
        <nav
            sx={{
                position: `sticky`,
                mt: `0rem`,
                pt: `0rem`,
                borderBottom: `0`,
                // margin: 0,
            }}
        >
            <p
                sx={{
                    textTransform: `uppercase`,
                    fontWeight: `700`,
                    fontSize: `0.875rem`,
                    letterSpacing: `0.075em`,
                    color: `#78757a`,
                    mt: `0`,
                }}
            >
                Table of Contents
            </p>
            {renderItems(items, activeId)}
        </nav>
    );
}

