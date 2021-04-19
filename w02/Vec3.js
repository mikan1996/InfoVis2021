class Vec3
{
    constructor(x,y,z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    //task2

    shaffle()
    {
        var vec3 = [this.x,this.y,this.z];

        vec3.sort(function(a,b){
            if(a < b) return -1;
            if(a > b) return 1;
            return 0;
        });

        return vec3;
    }

    min()
    {
        var vec3 = this.shaffle();
        return vec3[0];
    }

    max()
    {
        var vec3 = this.shaffle();
        return vec3[2];
    }

    mid()
    {
        var vec3 = this.shaffle();
        return vec3[1];
    }

    result()
    {
        var min = this.min();
        var mid = this.mid();
        var max = this.max();

        var result;

        result = min+ " is min.\n" + mid + " is mid.\n" + max + " is max.\n";
        return result;
    }

    //task3

    //距離
    static distance(v1,v2){
        return Math.pow(v1.x-v2.x,2)+ Math.pow(v1.y - v2.y,2)+Math.pow(v1.z- v2.z,2);
    }

    //差分
    static subtraction(a,b){
        return  new Vec3(a.x - b.x, a.y - b.y, a.z -b.z);
    }

    //内積
    static innerproduct(a,b){
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    //面積
    static area(v1,v2,v3){
        var a = Vec3.subtraction(v1,v2);
        var b = Vec3.subtraction(v2,v3);

        return Math.sqrt(this.distance(v1,v2) * this.distance(v2,v3) - Math.pow(this.innerproduct(a,b),2))/2;
    }

}