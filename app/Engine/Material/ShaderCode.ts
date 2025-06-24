export { ShaderCode }

class ShaderCode {
    private vertex: string;
    private fragment: string;

    public constructor(old?: ShaderCode, vertex?: string, fragment?: string) {
        this.vertex = old?.vertex || vertex || '';
        this.fragment = old?.fragment || fragment || '';
    }

    public duplicate(): ShaderCode {
        return new ShaderCode(this);
    }
}
