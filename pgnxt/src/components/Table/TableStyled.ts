import styled, { css } from 'styled-components';

import { ThemeProps } from '../../resources/theme';
import { hexToRgba } from '../../utils/hexToRgba';
import { MiniSelect } from '../Controls/MiniSelect';
import { Icon } from '../Icon';

export const StTableContainer = styled.div(
  () => css`
    width: 100%;
    margin: 10px 0;
  `,
);

export const StTable = styled.table(
  ({
    selectable,
    theme: {
      colors: {
        darkgray,
        lightergray,
        mediumsky,
        tint: { sky10, sky30 },
        white,
      },
      typography: {
        fontSizes: { small },
        textFonts: { regular },
      },
    },
  }: {
    selectable: boolean;
    theme: ThemeProps;
  }) => {
    const selectableTable = css`
      tr td:first-child,
      tr th:first-child {
        width: 1%;
        white-space: nowrap;
      }
    `;

    return css`
      width: 100%;
      border-collapse: collapse;

      thead tr,
      tbody tr {
        border-bottom: 1px solid ${mediumsky};
        position: relative;
      }

      thead {
        text-align: left;

        tr th {
          background-color: ${lightergray};
          padding: 12px 20px;
          font-weight: normal;

          h3 {
            contain: inline-size;
            min-width: 40px;

            .table-th-title {
              display: block;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }

          &.table-th--sortable {
            cursor: pointer;
          }

          &:first-child {
            border-top-left-radius: 5px;
          }

          &:last-child {
            border-top-right-radius: 5px;
          }
        }
      }

      tbody {
        tr {
          background-color: ${white};
        }

        tr td {
          padding: 15px 20px;
        }
      }

      tbody tr td.actions-col,
      thead tr th.actions-col {
        width: 25px;
        padding: 0;
        height: 1px;
      }

      /* Selectable styles */
      ${selectable && selectableTable}

      /* Collapsible styles */
      &.table--collapsible {
        border-collapse: separate;
        border-spacing: 0 8px;

        thead > tr > th {
          border-bottom: 1px solid ${mediumsky};
        }

        tbody:first-of-type > tr {
          border: none;

          &.table__tr--odd > td {
            background-color: inherit;
          }

          /* Inside collapsible content */
          &.table__tr--collapsedContent {
            transform: translate(0, -8px);

            & > td {
              padding: 0;
            }

            /* Standard table inside collapsed content */
            .table__container {
              margin: 0;

              .table {
                border-collapse: separate;
                border-spacing: 0;
                border-radius: 2px 2px 4px 4px;
                border: 1px solid ${mediumsky};
                overflow: hidden;

                thead tr {
                  th {
                    background-color: ${sky10};
                    border-bottom: 1px solid ${mediumsky};
                    padding: 12px 20px;

                    h3 {
                      font-family: ${regular};
                      font-size: ${small};
                      color: ${darkgray};
                      text-transform: uppercase;
                    }
                  }
                }

                tbody {
                  td {
                    background-color: ${sky30};
                    border-radius: 0;
                    border: none;
                    padding: 20px;
                    color: ${darkgray};
                  }

                  tr:not(:last-child) td {
                    border-bottom: 1px solid ${mediumsky};
                  }
                }

                tbody tr td:first-child,
                thead tr th:first-child {
                  padding-left: 64px;
                }
              }
            }
          }

          &:not(.table__tr--collapsedContent) > td {
            border: 1px solid ${mediumsky};
            border-style: solid none;

            &.table__td--collapsibleAction {
              padding-right: 0;
            }

            &:first-child {
              border-top-left-radius: 4px;
              border-bottom-left-radius: 4px;
              border-style: solid;
              border-right-style: none;
            }

            &:last-child {
              border-top-right-radius: 4px;
              border-bottom-right-radius: 4px;
              border-style: solid;
              border-left-style: none;
            }
          }
        }
      }
    `;
  },
);

export const StShowingTitle = styled.div(
  ({
    theme: {
      colors: { darkergray },
      typography: {
        fontSizes: { small },
        textFonts: { bold },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    font-size: ${small};
    color: ${darkergray};
    opacity: 0.7;
    margin-bottom: 4px;

    span ~ span {
      font-family: ${bold};
    }
  `,
);

export const StSelect = styled(MiniSelect)(
  () => css`
    width: 60px;
  `,
);

export const StTableFooterInfo = styled.div(
  ({
    theme: {
      typography: {
        fontSizes: { small },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: ${small};
  `,
);

export const StInfoLeft = styled.div(() => css``);

export const StInfoRight = styled.div(
  ({
    theme: {
      colors: { darkergray },
      typography: {
        textFonts: { bold },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    opacity: 0.8;
    color: ${darkergray};
    font-family: ${bold};
  `,
);

export const StActionsToggle = styled.div(
  ({
    hasActions,
    isActive,
    theme: {
      colors: { boston, santander },
    },
  }: {
    hasActions: boolean;
    isActive: boolean;
    theme: ThemeProps;
  }) => {
    const activeStyles = css`
      background-color: ${santander};

      &:hover {
        opacity: 1;
        background-color: ${boston};
      }

      img {
        filter: brightness(0) invert(1);
      }
    `;

    const hasActionsStyles = css`
      opacity: 0.4;
      pointer-events: none;
    `;

    return css`
      width: 100%;
      height: 100%;
      padding: 16px;
      display: flex;
      cursor: pointer;
      justify-content: center;
      align-items: center;

      .table--collapsible & {
        height: calc(100% + 1px);
      }

      &:hover {
        opacity: 0.8;
      }

      ${isActive && activeStyles}
      ${!hasActions && hasActionsStyles}
    `;
  },
);

export const StActionsContainer = styled.ul(
  ({
    theme: {
      colors: { boston, darkergray, santander },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    height: 100%;
    width: 100%;
    margin: 0;
    position: absolute;
    top: 0.5px;
    right: 55px;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    background-color: ${hexToRgba(darkergray, 0.3)};

    .table--collapsible & {
      height: calc(100% - 1px);
    }

    li {
      background-color: ${santander};
      width: 150px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      border-right: 1px solid ${boston};

      &:hover {
        cursor: pointer;
        background-color: ${boston};
      }

      div {
        display: flex;
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;
      }
    }
  `,
);

export const StPagesContainer = styled.div(
  ({
    theme: {
      colors: { darkergray },
      typography: {
        fontSizes: { regular: regularSize },
        textFonts: { bold, regular },
      },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    display: inline-flex;

    button {
      font-family: ${regular};
      font-size: ${regularSize};
    }

    ul {
      display: inline-flex;
      flex-direction: row;
      margin: 0 10px;
      justify-content: center;
      align-items: center;
      padding: 0;

      li {
        cursor: pointer;
        font-family: ${regular};
        padding: 0 8px;

        &.active {
          font-family: ${bold};
          color: ${darkergray};
        }
      }
    }
  `,
);

export const StSortByIcon = styled(Icon)(
  ({
    theme: {
      iconColors: { darkturquoise },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    filter: ${darkturquoise};
    margin-left: 4px;
  `,
);
