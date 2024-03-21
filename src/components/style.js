import styled from "styled-components"

export const Group = styled.div`
    min-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: ${({gap}) => gap}px;
`