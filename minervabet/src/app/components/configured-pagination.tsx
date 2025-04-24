import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ConfiguredPaginationProps {
  page: number;
  totalPagesQt: number;
  handlePrevPageClick: () => void;
  handleNextPageClick: () => void;
  handleSpecificPageClick: (page: number) => void;
}

export default function ConfiguredPagination({
  page,
  totalPagesQt,
  handleNextPageClick,
  handlePrevPageClick,
  handleSpecificPageClick,
}: ConfiguredPaginationProps) {
  return (
    <Pagination className="text-white w-full mb-2">
      <PaginationContent className="flex justify-around">
        <PaginationItem>
          <Button
            onClick={handlePrevPageClick}
            className="cursor-pointer bg-transparent"
          >
            <ChevronLeft />
          </Button>
        </PaginationItem>

        {page === totalPagesQt ? (
          <PaginationItem>
            <Button
              className="bg-transparent cursor-pointer"
              onClick={() => handleSpecificPageClick(page - 2)}
            >
              <p>{page - 2}</p>
            </Button>
          </PaginationItem>
        ) : null}

        {page - 1 > 0 ? (
          <PaginationItem>
            <Button
              className="bg-transparent cursor-pointer"
              onClick={() => handleSpecificPageClick(page - 1)}
            >
              {page - 1}
            </Button>
          </PaginationItem>
        ) : null}

        <PaginationItem>
          <Button className="bg-transparent border-2 border-white cursor-pointer">
            {page}
          </Button>
        </PaginationItem>

        {page + 1 <= totalPagesQt ? (
          <PaginationItem>
            <Button
              className="bg-transparent cursor-pointer"
              onClick={() => handleSpecificPageClick(page + 1)}
            >
              {page + 1}
            </Button>
          </PaginationItem>
        ) : null}

        {page === 1 ? (
          <PaginationItem>
            <Button
              className="bg-transparent cursor-pointer"
              onClick={() => handleSpecificPageClick(page + 2)}
            >
              {page + 2}
            </Button>
          </PaginationItem>
        ) : null}

        <PaginationItem>
          <Button
            onClick={handleNextPageClick}
            className="bg-transparent cursor-pointer"
          >
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
