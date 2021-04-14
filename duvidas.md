## Dúvidas

 - Quanto ao seguinte trecho da documentação relativo a text index:
    
    > Stemmed Words
    >
    >For case insensitive and diacritic insensitive text searches, the $text operator matches on the complete stemmed word. So if a document field contains the word blueberry, a search on the term blue will not match. However, blueberry or blueberries will match.

    Como o banco faz para chegar ao `tronco` de uma dada palavra? É uma tabela auxiliar ou uma espécie de regex que faz um match parcial?

 - Como é definido o score medido pelo `$meta textScore` (parâmetro de ordenação que poder ser usado numa query por text)?

