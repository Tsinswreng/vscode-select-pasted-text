//watch "E:/_code/SelectPastedText/select-pasted-text/TswG_log"
import * as fs from 'fs'
export function log(...v:any[]){
	const path = "E:/_code/SelectPastedText/select-pasted-text/TswG_log"
	v.map(e=>{
		let ans = ""
		if(typeof e === "object"){
			ans = JSON.stringify(e)
		}else{
			ans = e+''
		}
		fs.appendFileSync(path, ans, {encoding: 'utf8'})
	})
}