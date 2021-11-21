import { Box, Link } from "../../atoms";
import { styled } from "stitches.config";

export const sidebarConfig = {
    width: '60px',
    expanded: '240px',
    collapsed: 0,
    itemProps: {
        size: "medium",
    }
};

export const sidebarVariants = {
    initial: {
        width: sidebarConfig.width
    },
    expanded: {
        width: sidebarConfig.expanded
    },
    collapsed: {
        width: sidebarConfig.collapsed
    }
};

export const SidebarIcon = styled(Box, {
    border: 0,
    borderRadius: 'card',
    cursor: 'pointer',
    height: sidebarConfig.width,
    display: "flex",
    alignItems: "center",
    color: 'white',
    mx: "14px",
    variants: {
        active: {
            background: 'body',
        }
    }
});

export const SidebarLink = styled(Link, {
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    height: "80px",
});

export const SidebarContainer = styled(Box, {
    boxSizing: 'border-box',
    background: '#011A41',
    display: 'flex',
    flexDirection: 'column',
    height: '89%',
    width: sidebarConfig.width,
    borderRadius: "4px",
    variants: {
        mode: {
            initial: {
                [`& .link-text`]: {
                    display: 'none'
                },
                [`& .link-text-active`]: {
                    display: 'none'
                },
                [`& .settings`]: {
                    width: "40px",
                    height: "40px",
                    mx: "10px",
                    display: "flex",
                    alignItems: 'center',
                    backgroundColor: "#022864",
                    borderRadius: "4px",
                    marginTop: "auto",
                    marginBottom: "24px"
                },
                [`& .item`]: {
                    mx: "10px",
                },
                [`& .item-active`]: {
                    width: "40px",
                    height: "40px",
                    mx: "10px",
                    display: "flex",
                    alignItems: 'center',
                    backgroundColor: "white",
                    borderRadius: "4px",
                },
                [`& .select-active`]: {
                    position:"absolute",
                    width: "6px",
                    height: "40px",
                    mx: "0px",
                    backgroundColor: "#FFB800",
                    borderRadius: "4px",
                },
                [`& .icon-active`]: {
                    color:"#FFB800",
                }
            },
            expanded: {
                [`& .link-text-active`]: {
                    color:"#022864"
                },
                [`& .settings`]: {
                    width: "auto",
                    height: "40px",
                    mx: "10px",
                    display: "flex",
                    alignItems: 'center',
                    backgroundColor: "#022864",
                    borderRadius: "4px",
                    marginTop: "auto",
                    marginBottom: "24px"
                },
                [`& .item`]: {
                    mx: "10px",
                },
                [`& .item-active`]: {
                    width: "auto",
                    height: "40px",
                    mx: "10px",
                    display: "flex",
                    alignItems: 'center',
                    backgroundColor: "#FFB800",
                    borderRadius: "4px",
                },
                [`& .icon-active`]: {
                    color:"white",
                }

            },
        }
    }
});

export const SidebarItem = styled(Box, {
    width: "100%",
    marginTop: "10px",
});