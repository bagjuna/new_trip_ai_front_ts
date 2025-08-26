import { DateTimeFormatter, LocalDateTime } from '@js-joda/core';
import { Transform } from 'class-transformer';

export default class Trip {
  public id = 0;
  public title = '';
  public content = '';

  @Transform(({ value }) => LocalDateTime.parse(value, DateTimeFormatter.ISO_LOCAL_DATE_TIME))
  public regDate = LocalDateTime.now();

  public getStortTitle() {
    if (this.title.length > 10) {
      return this.title.substring(0, 10) + '...';
    }
    return this.title;
  }

  public getDisplayRegDate() {
    return this.regDate.format(
      DateTimeFormatter.ofPattern('yyyy년 MM월 dd일 HH시 mm분')
    );
  }

  public getDisplaySimpleRegDate() {
    return this.regDate.format(DateTimeFormatter.ofPattern('yyyy년MM월dd일'));
  }
}


// dayjs, monet, datefs
// but 맘에 안들어
// localDateTime, Joda