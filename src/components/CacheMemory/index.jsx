import {
  MainContainer,
  MemoryDirectionContainer,
  MemoryValueContainer,
} from "./styled";

export const CacheMemory = () => {
  return (
    <MainContainer>
      <MemoryDirectionContainer>Direcciones</MemoryDirectionContainer>
      <MemoryValueContainer>Valores</MemoryValueContainer>
    </MainContainer>
  );
};
