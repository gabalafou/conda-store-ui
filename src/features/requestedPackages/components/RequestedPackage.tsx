import React from "react";
import Typography from "@mui/material/Typography";
import TableCell from "@mui/material/TableCell";
import { requestedPackageParser } from "../../../utils/helpers";
import { useAppSelector } from "../../../hooks";
import styled from "@mui/material/styles/styled";

interface IRequestedPackageProps {
  /**
   * @param requestedPackage requested package
   */
  requestedPackage: string;
  isLast: boolean;
}

const StyledTableCell = styled(TableCell)(() => ({
  width: 190
}));

const StyledTypography = styled(Typography)(() => ({
  fontSize: "13px",
  color: "#333"
}));

export const RequestedPackage = ({
  requestedPackage,
  isLast
}: IRequestedPackageProps) => {
  const { versionsWithoutConstraints, versionsWithConstraints } =
    useAppSelector(state => state.requestedPackages);
  const { constraint, name, version } =
    requestedPackageParser(requestedPackage);

  return (
    <>
      <StyledTableCell
        sx={{
          borderBottom: isLast ? "none" : undefined
        }}
      >
        <StyledTypography>{name}</StyledTypography>
      </StyledTableCell>
      <StyledTableCell
        sx={{
          borderBottom: isLast ? "none" : undefined
        }}
      >
        <StyledTypography sx={{ fontFamily: "monospace" }}>
          {versionsWithConstraints[name] ?? versionsWithoutConstraints[name]}{" "}
        </StyledTypography>
      </StyledTableCell>
      <StyledTableCell
        sx={{
          textAlign: "right",
          borderBottom: isLast ? "none" : undefined
        }}
      >
        <StyledTypography
          sx={{
            fontFamily: constraint === "latest" ? "inherit" : "monospace",
            fontStyle: constraint === "latest" ? "italic" : "normal"
          }}
        >
          {constraint === "latest"
            ? "(no version requested)"
            : `${constraint.replace("==", "=")}${version}`}
        </StyledTypography>
      </StyledTableCell>
    </>
  );
};
