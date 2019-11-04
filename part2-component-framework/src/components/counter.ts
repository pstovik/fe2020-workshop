import * as framework from "../framework";

export default function Counter(params: { label: string; value: number }): string {
    return `
        <div class="counter">${params.label}: ${params.value}</div>
    `;
}

framework.componentStyle(`   
    .counter {
        display: inline-block;
        padding: 2px 5px
    }
`);
